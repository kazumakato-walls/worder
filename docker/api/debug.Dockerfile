FROM python:3.7

WORKDIR /usr/src/server
ADD requirements.txt .
# requirements.txtにリストされたパッケージをインストールする
RUN pip install --trusted-host pypi.python.org -r requirements.txt
RUN pip install debugpy

# FastAPIを8000ポートで待機
CMD ["python3", "-m", "debugpy", "--listen", "0.0.0.0:5678", "-m", "uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8080"]