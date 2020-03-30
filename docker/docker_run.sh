#!/bin/bash

# 目录挂载出来，nginx镜像也挂载到这个目录，所以nginx能读取到前端文件
sudo docker run --name ishou_web -v /home/tim/data/ishou/data/nginx/web:/opt/project/web -d ishou_web:latest
