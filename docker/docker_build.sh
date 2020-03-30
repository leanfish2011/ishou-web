# 1、构建vue序，得到静态文件
# 2、将静态文件包拷贝到docker目录中
# 3、构建镜像

#!/bin/bash

# 整个项目父路径
project_path_prefix="/home/tim/git/ishou"

function build_image()
{
    project_path=$project_path_prefix"/"$1
    echo $project_path
    cd $project_path
    latest_commit_id=$(git rev-parse --short HEAD)
    rm -rf dist/*
    npm run build
    rm -rf docker/web/*
    cp -r dist/* docker/web/
    cd docker
    time=$(date "+%Y%m%d_%H%M%S")
    tag=$time"_"$latest_commit_id
    docker_name=$1":"$tag
    sudo docker build -t $docker_name .
}

# 根据各个项目修改
project_name="ishou-web"

# 入口
build_image $project_name
