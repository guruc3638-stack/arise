import uuid
from datetime import datetime, timezone, timedelta
from app.core.security import hash_password
from app.routers.profile import _credentials_db
from app.repositories.profile_repository import profile_repo
from app.repositories.submission_repository import submission_repo
from app.repositories.self_study_repository import self_study_repo


from app.data.course_curricula import COURSE_CURRICULA

def pdf_escape(text: str) -> str:
    """Safely escapes text for inclusion in PDF literal strings."""
    return str(text).replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def generate_valid_pdf_bytes(title: str, topic: str, score: str, page_count: int = 16) -> bytes:
    """Generates a genuinely valid multi-page PDF-1.4 file densely populated with topic-appropriate content on every page."""
    course_key = "Course_101"
    for k in COURSE_CURRICULA.keys():
        if k.lower() in title.lower():
            course_key = k
            break
    
    curriculum = COURSE_CURRICULA.get(course_key, COURSE_CURRICULA["Course_101"])
    objects = []
    # 1: Catalog
    objects.append("<< /Type /Catalog /Pages 2 0 R >>")
    # 2: Pages root (placeholder, filled below)
    objects.append("")
    # 3: Font
    objects.append("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")

    page_refs = []
    page_obj_start = 4

    for i in range(1, page_count + 1):
        p_obj_id = page_obj_start + (i - 1) * 2
        c_obj_id = p_obj_id + 1
        page_refs.append(f"{p_obj_id} 0 R")

        page_data = curriculum[(i - 1) % len(curriculum)]
        ch_title = page_data.get("title", f"Module Chapter {i} Analysis & Proofs")
        concept_lines = page_data.get("concept", [])
        math_lines = page_data.get("math", [])
        code_lines = page_data.get("code", [])
        analysis_lines = page_data.get("analysis", [])
        checkpoint_lines = page_data.get("checkpoint", [])

        stream_lines = [
            "BT",
            "/F1 14 Tf",
            "40 750 Td",
            f"({pdf_escape(title)} - Page {i} of {page_count}) Tj",
            "/F1 9 Tf",
            "0 -18 Td",
            f"(ARISE Certified Academic Assessment Document | Track: {pdf_escape(topic)} | Score: {pdf_escape(score)}) Tj",
            "0 -13 Td",
            "(Evaluation Authority: Academic Evaluation Board | Rule 7 Honor Code: Verified Self-Study) Tj",
            "0 -18 Td",
            "/F1 11 Tf",
            f"(Chapter {i}: {pdf_escape(ch_title)}) Tj",
            "0 -16 Td",
            "/F1 10 Tf",
            "(1. Theoretical Framework & Conceptual Model:) Tj",
            "/F1 8.5 Tf",
        ]
        for c in concept_lines[:4]:
            stream_lines.extend(["0 -12 Td", f"({pdf_escape(c)}) Tj"])

        stream_lines.extend([
            "0 -16 Td",
            "/F1 10 Tf",
            "(2. Formal Mathematical Invariants & Recurrence Relations:) Tj",
            "/F1 8.5 Tf",
        ])
        for m in math_lines[:3]:
            stream_lines.extend(["0 -12 Td", f"({pdf_escape(m)}) Tj"])

        stream_lines.extend([
            "0 -16 Td",
            "/F1 10 Tf",
            "(3. Production Reference Implementation & Invariant Assertion Model:) Tj",
            "/F1 8.5 Tf",
        ])
        for cd in code_lines[:5]:
            stream_lines.extend(["0 -12 Td", f"({pdf_escape(cd)}) Tj"])

        stream_lines.extend([
            "0 -16 Td",
            "/F1 10 Tf",
            "(4. Asymptotic Bounds & Complexity Analysis:) Tj",
            "/F1 8.5 Tf",
        ])
        for a in analysis_lines[:3]:
            stream_lines.extend(["0 -12 Td", f"({pdf_escape(a)}) Tj"])

        stream_lines.extend([
            "0 -16 Td",
            "/F1 10 Tf",
            "(5. Formative Assessment Checkpoint & Verification Proof:) Tj",
            "/F1 8.5 Tf",
        ])
        for cp in checkpoint_lines[:3]:
            stream_lines.extend(["0 -12 Td", f"({pdf_escape(cp)}) Tj"])

        stream_lines.extend([
            "0 -20 Td",
            "/F1 8 Tf",
            f"(Official ARISE Assessment Record | Page {i} of {page_count} | Cryptographic Hash: SHA256-V{i:02d} | Validated) Tj",
            "ET"
        ])

        stream_text = "\n".join(stream_lines)
        stream_bytes = stream_text.encode("latin1")
        page_obj = f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents {c_obj_id} 0 R /Resources << /Font << /F1 3 0 R >> >> >>"
        content_obj = f"<< /Length {len(stream_bytes)} >>\nstream\n{stream_text}\nendstream"
        objects.append(page_obj)
        objects.append(content_obj)

    # Fill Pages root (object 2)
    objects[1] = f"<< /Type /Pages /Kids [{chr(32).join(page_refs)}] /Count {page_count} >>"

    # Assemble PDF with byte offsets
    body = "%PDF-1.4\n"
    offsets = [0]
    for idx, obj in enumerate(objects, start=1):
        offsets.append(len(body.encode("latin1")))
        body += f"{idx} 0 obj\n{obj}\nendobj\n"

    xref_pos = len(body.encode("latin1"))
    body += f"xref\n0 {len(objects) + 1}\n0000000000 65535 f \n"
    for off in offsets[1:]:
        body += f"{off:010d} 00000 n \n"
    body += f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{xref_pos}\n%%EOF\n"
    return body.encode("latin1")


async def seed_platform_data():
    """
    Authoritative Seed Function:
    1. Creates credentials for demo account: xyz@gmail.com / xyz12345
    2. Seeds authoritative profile ranking #1 in College, District, and State with 10,540 XP and 148 solved problems.
    3. Seeds 6 genuine assessment PDFs in Self Study for xyz@gmail.com.
    4. Seeds competitor cohort across COEP, Pune, and Maharashtra to guarantee non-empty scopes.
    """
    demo_email = "xyz@gmail.com"
    demo_password = "xyz12345"
    demo_user_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, demo_email))
    demo_uid = "AR-XYZ999"

    # 1. Direct Backend Account Creation in Credentials Store
    _credentials_db[demo_email] = hash_password(demo_password)

    # 2. Seed Demo User Profile (Aarav Sharma - #1 Hunter)
    existing_demo = await profile_repo.get_by_user_id(demo_user_id)
    if not existing_demo:
        await profile_repo.create({
            "user_id": demo_user_id,
            "uid": demo_uid,
            "email": demo_email,
            "display_name": "Aarav Sharma",
            "college_name": "COEP Technological University",
            "district_name": "Pune",
            "state_code": "MH",
            "country_code": "IN",
            "show_dsa_rank": True,
            "show_dsa_progress": True,
            "rank_college": 1,
            "rank_district": 1,
            "rank_state": 1,
            "rank_india": 1,
            "rank_display": "#1",
        })

    # 3. Seed 148 Solved Problems & 10,540 Verified XP for Demo User
    # 50 Hard @ 100 XP = 5000 XP
    # 50 Medium @ 70 XP = 3500 XP
    # 40 Easy @ 40 XP = 1600 XP
    # 8 Advanced @ 55 XP = 440 XP
    # Total = 10,540 XP across 148 unique problems
    base_time = datetime.now(timezone.utc) - timedelta(days=90)
    user_awards = [p for (u, p) in submission_repo._xp_awards.keys() if u == demo_user_id]
    
    if len(user_awards) < 148:
        current_idx = 1
        # 50 Hard
        for i in range(50):
            pid = f"ARISE-P{100 + current_idx}"
            pair = (demo_user_id, pid)
            if pair not in submission_repo._xp_awards:
                solve_time = base_time + timedelta(hours=current_idx * 12)
                award_id = str(uuid.uuid4())
                submission_repo._xp_awards[pair] = {
                    "id": award_id, "user_id": demo_user_id, "problem_id": pid,
                    "submission_id": str(uuid.uuid4()), "xp_amount": 100,
                    "policy_version": "v1.0", "awarded_at": solve_time
                }
                submission_repo._xp_ledger.append({
                    "id": str(uuid.uuid4()), "user_id": demo_user_id, "award_id": award_id,
                    "delta_xp": 100, "reason": f"First verified solve of {pid}", "created_at": solve_time
                })
                submission_repo._practice_stats[pair] = {
                    "user_id": demo_user_id, "problem_id": pid, "attempt_count": 1,
                    "successful_attempt_count": 1, "first_solved_at": solve_time, "last_practiced_at": solve_time
                }
            current_idx += 1

        # 50 Medium
        for i in range(50):
            pid = f"ARISE-P{100 + current_idx}"
            pair = (demo_user_id, pid)
            if pair not in submission_repo._xp_awards:
                solve_time = base_time + timedelta(hours=current_idx * 12)
                award_id = str(uuid.uuid4())
                submission_repo._xp_awards[pair] = {
                    "id": award_id, "user_id": demo_user_id, "problem_id": pid,
                    "submission_id": str(uuid.uuid4()), "xp_amount": 70,
                    "policy_version": "v1.0", "awarded_at": solve_time
                }
                submission_repo._xp_ledger.append({
                    "id": str(uuid.uuid4()), "user_id": demo_user_id, "award_id": award_id,
                    "delta_xp": 70, "reason": f"First verified solve of {pid}", "created_at": solve_time
                })
                submission_repo._practice_stats[pair] = {
                    "user_id": demo_user_id, "problem_id": pid, "attempt_count": 1,
                    "successful_attempt_count": 1, "first_solved_at": solve_time, "last_practiced_at": solve_time
                }
            current_idx += 1

        # 40 Easy
        for i in range(40):
            pid = f"ARISE-P{100 + current_idx}"
            pair = (demo_user_id, pid)
            if pair not in submission_repo._xp_awards:
                solve_time = base_time + timedelta(hours=current_idx * 12)
                award_id = str(uuid.uuid4())
                submission_repo._xp_awards[pair] = {
                    "id": award_id, "user_id": demo_user_id, "problem_id": pid,
                    "submission_id": str(uuid.uuid4()), "xp_amount": 40,
                    "policy_version": "v1.0", "awarded_at": solve_time
                }
                submission_repo._xp_ledger.append({
                    "id": str(uuid.uuid4()), "user_id": demo_user_id, "award_id": award_id,
                    "delta_xp": 40, "reason": f"First verified solve of {pid}", "created_at": solve_time
                })
                submission_repo._practice_stats[pair] = {
                    "user_id": demo_user_id, "problem_id": pid, "attempt_count": 1,
                    "successful_attempt_count": 1, "first_solved_at": solve_time, "last_practiced_at": solve_time
                }
            current_idx += 1

        # 8 Advanced
        for i in range(8):
            pid = f"ARISE-P{100 + current_idx}"
            pair = (demo_user_id, pid)
            if pair not in submission_repo._xp_awards:
                solve_time = base_time + timedelta(hours=current_idx * 12)
                award_id = str(uuid.uuid4())
                submission_repo._xp_awards[pair] = {
                    "id": award_id, "user_id": demo_user_id, "problem_id": pid,
                    "submission_id": str(uuid.uuid4()), "xp_amount": 55,
                    "policy_version": "v1.0", "awarded_at": solve_time
                }
                submission_repo._xp_ledger.append({
                    "id": str(uuid.uuid4()), "user_id": demo_user_id, "award_id": award_id,
                    "delta_xp": 55, "reason": f"First verified solve of {pid}", "created_at": solve_time
                })
                submission_repo._practice_stats[pair] = {
                    "user_id": demo_user_id, "problem_id": pid, "attempt_count": 1,
                    "successful_attempt_count": 1, "first_solved_at": solve_time, "last_practiced_at": solve_time
                }
            current_idx += 1

        # Add 14 extra practice attempts to show realistic practice activity (162 attempts total)
        for i in range(1, 15):
            pid = f"ARISE-P{100 + i}"
            pair = (demo_user_id, pid)
            if pair in submission_repo._practice_stats:
                submission_repo._practice_stats[pair]["attempt_count"] += 1

    # 4. Seed 6 Learning Assessment PDFs in Self Study for Demo User (16 pages each with rich academic content)
    user_files = await self_study_repo.list_user_files(demo_user_id)
    needs_reseed = len(user_files) < 6 or any(f.get("size_bytes", 0) < 40000 for f in user_files)
    if needs_reseed:
        for old_f in user_files:
            await self_study_repo.delete_file(old_f["id"])

        assessments = [
            ("Course_101_Data_Structures_Assessment.pdf", "Foundations of Data Structures & Complexity", "96% Pass", 16),
            ("Course_201_Graph_Algorithms_Assessment.pdf", "Advanced Graph Algorithms & Network Flow", "94% Pass", 16),
            ("Course_202_Dynamic_Programming_Assessment.pdf", "Dynamic Programming & Optimal Substructure", "98% Pass", 16),
            ("Course_301_System_Design_Assessment.pdf", "System Architecture & Scalable Distribution", "92% Pass", 16),
            ("Course_302_Operating_Systems_Assessment.pdf", "OS Internals, Concurrency & Memory Paging", "95% Pass", 16),
            ("Course_401_Combinatorics_Crypto_Assessment.pdf", "Combinatorics, Number Theory & Cryptography", "100% Pass", 16)
        ]
        for filename, topic, score, page_count in assessments:
            file_bytes = generate_valid_pdf_bytes(filename.replace(".pdf", ""), topic, score, page_count)
            meta = {
                "id": str(uuid.uuid4()),
                "user_id": demo_user_id,
                "original_filename": filename,
                "mime_type": "application/pdf",
                "size_bytes": len(file_bytes),
                "page_count": page_count,
                "created_at": datetime.now(timezone.utc) - timedelta(days=10)
            }
            await self_study_repo.save_file(meta, file_bytes)

    # 5. Seed Peer Cohort for Non-Empty College, District, and State Leaderboards
    cohort = [
        {
            "email": "siddharth.verma@iitb.ac.in", "uid": "AR-BOM01", "name": "Siddharth Verma",
            "college": "IIT Bombay", "district": "Mumbai", "state": "MH", "xp": 9480, "solved": 130
        },
        {
            "email": "neha.sengupta@vjti.ac.in", "uid": "AR-VJTI02", "name": "Neha Sengupta",
            "college": "VJTI Mumbai", "district": "Mumbai", "state": "MH", "xp": 8750, "solved": 118
        },
        {
            "email": "aarav.mehta@pict.edu", "uid": "AR-PICT03", "name": "Aarav Mehta",
            "college": "PICT Pune", "district": "Pune", "state": "MH", "xp": 6240, "solved": 82
        },
        {
            "email": "devansh.joshi@mitwpu.edu", "uid": "AR-MIT04", "name": "Devansh Joshi",
            "college": "MIT World Peace University", "district": "Pune", "state": "MH", "xp": 5810, "solved": 76
        },
        {
            "email": "prathamesh.sawant@coep.ac.in", "uid": "AR-COEP05", "name": "Prathamesh Sawant",
            "college": "COEP Technological University", "district": "Pune", "state": "MH", "xp": 4890, "solved": 64
        },
        {
            "email": "shreya.kulkarni@coep.ac.in", "uid": "AR-COEP06", "name": "Shreya Kulkarni",
            "college": "COEP Technological University", "district": "Pune", "state": "MH", "xp": 4120, "solved": 58
        },
        {
            "email": "rohan.deshmukh@coep.ac.in", "uid": "AR-COEP07", "name": "Rohan Deshmukh",
            "college": "COEP Technological University", "district": "Pune", "state": "MH", "xp": 3420, "solved": 48
        },
        {
            "email": "varun.jadhav@coep.ac.in", "uid": "AR-COEP08", "name": "Varun Jadhav",
            "college": "COEP Technological University", "district": "Pune", "state": "MH", "xp": 3100, "solved": 43
        },
        {
            "email": "aniket.more@coep.ac.in", "uid": "AR-COEP09", "name": "Aniket More",
            "college": "COEP Technological University", "district": "Pune", "state": "MH", "xp": 2850, "solved": 39
        }
    ]

    for p in cohort:
        u_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, p["email"]))
        c_prof = await profile_repo.get_by_user_id(u_id)
        if not c_prof:
            await profile_repo.create({
                "user_id": u_id,
                "uid": p["uid"],
                "email": p["email"],
                "display_name": p["name"],
                "college_name": p["college"],
                "district_name": p["district"],
                "state_code": p["state"],
                "country_code": "IN",
                "show_dsa_rank": True,
                "show_dsa_progress": True
            })

        # Ensure XP in ledger for competitor
        current_xp = await submission_repo.get_total_verified_xp(u_id)
        if current_xp < p["xp"]:
            diff = p["xp"] - current_xp
            award_id = str(uuid.uuid4())
            sub_pair = (u_id, f"ARISE-SEED-{p['uid']}")
            submission_repo._xp_awards[sub_pair] = {
                "id": award_id, "user_id": u_id, "problem_id": sub_pair[1],
                "submission_id": str(uuid.uuid4()), "xp_amount": diff,
                "policy_version": "v1.0", "awarded_at": base_time + timedelta(hours=10)
            }
            submission_repo._xp_ledger.append({
                "id": str(uuid.uuid4()), "user_id": u_id, "award_id": award_id,
                "delta_xp": diff, "reason": f"Cohort initial verified XP", "created_at": base_time + timedelta(hours=10)
            })
            submission_repo._practice_stats[sub_pair] = {
                "user_id": u_id, "problem_id": sub_pair[1], "attempt_count": p["solved"],
                "successful_attempt_count": p["solved"],
                "first_solved_at": base_time + timedelta(hours=10),
                "last_practiced_at": base_time + timedelta(hours=10)
            }
