FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y python3-pip wget git && \
    wget -O /tmp/solc https://github.com/ethereum/solidity/releases/download/v0.8.7/solc-static-linux && \
    mv /tmp/solc /usr/bin/solc && \
    chmod +x /usr/bin/solc && \
    rm -rf /var/lib/apt/lists/*

RUN pip3 install mythril

WORKDIR /app

ADD *.sol /app/

CMD ["sh", "-c", "myth analyze /app/$FILENAME -o text > /app/results"]



