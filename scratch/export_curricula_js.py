import sys
import json
sys.path.insert(0, r"d:\ARISE\backend")

from app.data.course_curricula import COURSE_CURRICULA

target_js = r"d:\ARISE\js\curricula.js"

with open(target_js, "w", encoding="utf-8") as f:
    f.write("// Authoritative Course Curricula for ARISE Self Study Reader\n")
    f.write("// Densely populated 16-page curricula for all 6 assessment documents\n")
    f.write("const ARISE_CURRICULA = ")
    json.dump(COURSE_CURRICULA, f, indent=2)
    f.write(";\n\n")
    f.write("if (typeof window !== 'undefined') {\n")
    f.write("  window.ARISE_CURRICULA = ARISE_CURRICULA;\n")
    f.write("}\n")
    f.write("if (typeof module !== 'undefined') {\n")
    f.write("  module.exports = { ARISE_CURRICULA };\n")
    f.write("}\n")

print(f"Exported ARISE_CURRICULA to {target_js} successfully!")
