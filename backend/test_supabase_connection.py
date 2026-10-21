import json
import sys
from pathlib import Path

# Add app to path
sys.path.insert(0, str(Path(__file__).parent))

from app.core.supabase import test_supabase_connection

if __name__ == "__main__":
    result = test_supabase_connection()
    print("\n=======================================================")
    print("           ARISE Supabase Connection Check             ")
    print("=======================================================")
    print(json.dumps(result, indent=2))
    print("=======================================================\n")
