ADDRESS='unix:/home/ec2-user/gunicorn.sock'
NUM_WORKERS=3
LOG=server_log.txt
source ../../../venv/bin/activate
exec gunicorn -b $ADDRESS -w $NUM_WORKERS TFGOL.wsgi:application --log-level=debug --log-file=$LOG &>>$LOG &
