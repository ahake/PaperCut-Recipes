from sys import argv,exit
import csv, xmlrpclib

# this script is made to be called from a batch file
# you would call it with the input file (matter list export file) and the output file (PaperCut batch account import file)
# ie python "PE Matter to PaperCut.py" "C:\matter_export\matters.csv" "C:\matter_export\fxmp_acccount_import.tsv"
# see the additional 'import_matters.cmd' file and the 'MP Import Matters.xml' Scheduled Task.

ipaddress = ''              # PaperCut server
portnum = '9191'
apipw = ''                  # Enter API password

try:
  infile = argv[1]
  outfile = argv[2]
except IndexError:
  print 'Error: No input / output file specified. Exiting.'
  exit(1)

server = xmlrpclib.Server('http://{}:{}/rpc/api/xmlrpc'.format(ipaddress, portnum))  

cache = []
xmlcache = {}
# [ ["option1","value"],["option2","value"] ]


try:
  with open(infile) as fh, open(outfile,'w') as output:
    csvf = csv.reader(fh)
    # skip the first line
    # csvf.next()
    for line in csvf:
      cache.append(line[0] + '\t\tY\t' + line[0] + '\t\tN\t\t\t\t\t' + line[1] + ',' + line[2] + '\n')
      xmlcache[line[0]] = [['pin', line[0]],['notes', line[1] + ' ' + line[2]], ['disabled', 'N'],['restricted', 'N']]
      if not server.api.isSharedAccountExists(apipw, line[0]):
        server.api.addNewSharedAccount(apipw, line[0])
        # print xmlcache[line[0]]
        server.api.setSharedAccountProperties(apipw, line[0], xmlcache[line[0]])
        # server.api.setSharedAccountProperty(apipw, line[0], 'pin', line[0])
        # server.api.setSharedAccountProperty(apipw, line[0], 'notes', line[1] + ',' + line[2])
        # server.api.setSharedAccountProperty(apipw, line[0], 'disabled', 'N')
        # server.api.setSharedAccountProperty(apipw, line[0], 'restricted', 'N')
    for value in cache:
      output.write(value)
except Exception as Inst:
  print Inst
exit(0)
