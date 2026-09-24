Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
folder = fso.GetParentFolderName(WScript.ScriptFullName)
shell.CurrentDirectory = folder
shell.Run Chr(34) & folder & "\node_modules\electron\dist\electron.exe" & Chr(34) & " " & Chr(34) & folder & Chr(34), 1, False
