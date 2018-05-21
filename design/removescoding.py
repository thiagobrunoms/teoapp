#f = open("/Users/thiagodesales/Dropbox/My_Studies/Ufal/Projetos/TEO/design")
import os

d = os.listdir("/Users/thiagodesales/Dropbox/My_Studies/Ufal/Projetos/TEO/design")
for file in d:
	if "Conflito" in file:
		limit = file.index("(")
		extension = file.index(".")
		print(file)
		new_file_name = file[0:limit-1] + file[extension:]
		print("changed " + new_file_name)
		os.rename(file, new_file_name) 
