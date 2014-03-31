#!/bin/bash

#
# This stuff needs: python (plus devel, too, probs)
#		    mysql (plus devel, too, probs)
#                   pip (easy_install)		    
#

mysql -u root -p < db_setup.sql

#I hope you have virtualenv
virtualenv ../venv
source ../venv/bin/activate

pip install -r pip_requirements.txt

python python/TFGOL/manage.py syncdb
