"C:\Program Files\Git\cmd\git.exe" init
"C:\Program Files\Git\cmd\git.exe" config user.email "hemadeepika@example.com"
"C:\Program Files\Git\cmd\git.exe" config user.name "Hema Deepika"
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "Initial release of AI Concierge app"
"C:\Program Files\Git\cmd\git.exe" branch -M main
"C:\Program Files\Git\cmd\git.exe" remote remove origin 2>nul
"C:\Program Files\Git\cmd\git.exe" remote add origin https://github.com/hemadeepika143/AI-Concierge-for-ET.git
"C:\Program Files\Git\cmd\git.exe" push -u origin main
