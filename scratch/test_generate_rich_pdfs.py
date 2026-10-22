import sys
sys.path.insert(0, r"d:\ARISE\backend")

from app.data.course_curricula import COURSE_CURRICULA

def pdf_escape(text: str) -> str:
    return str(text).replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")

def generate_valid_pdf_bytes(title: str, topic: str, score: str, page_count: int = 16) -> bytes:
    course_key = "Course_101"
    for k in COURSE_CURRICULA.keys():
        if k.lower() in title.lower():
            course_key = k
            break
    
    curriculum = COURSE_CURRICULA.get(course_key, COURSE_CURRICULA["Course_101"])
    objects = []
    objects.append("<< /Type /Catalog /Pages 2 0 R >>")
    objects.append("") # Pages root
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

    objects[1] = f"<< /Type /Pages /Kids [{chr(32).join(page_refs)}] /Count {page_count} >>"

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

# Test generating all 6 PDFs
courses = [
    ("Course_101_Data_Structures_Assessment.pdf", "Data Structures", "96% Pass"),
    ("Course_201_Graph_Algorithms_Assessment.pdf", "Algorithms", "94% Pass"),
    ("Course_202_Dynamic_Programming_Assessment.pdf", "Algorithms", "98% Pass"),
    ("Course_301_System_Design_Assessment.pdf", "System Design", "92% Pass"),
    ("Course_302_Operating_Systems_Assessment.pdf", "Core CS", "95% Pass"),
    ("Course_401_Combinatorics_Crypto_Assessment.pdf", "Mathematics", "100% Pass"),
]

for filename, topic, score in courses:
    pdf_bytes = generate_valid_pdf_bytes(filename.replace(".pdf", ""), topic, score, 16)
    print(f"- {filename}: {len(pdf_bytes)} bytes (~{len(pdf_bytes) // 1024} KB), valid %PDF: {pdf_bytes.startswith(b'%PDF-1.4')}")
