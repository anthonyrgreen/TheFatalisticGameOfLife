ADDRESS='ec2-54-186-239-29.us-west-2.compute.amazonaws.com:8002'
NUM_WORKERS=3
LOG=server_log.txt
source ../../../venv/bin/activate
exec gunicorn -b $ADDRESS -w $NUM_WORKERS TFGOL.wsgi:application --log-level=debug --log-file=$LOG 2>>$LOG 1>>$LOG &
