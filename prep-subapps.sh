#!/bin/bash
shopt -s dotglob

bin_path=tauri/bin

rm -rf $bin_path

backend_bin_path=$bin_path/backend
gscrap_bin_path=$bin_path/service/gscrap

mkdir -p $backend_bin_path
mkdir -p $gscrap_bin_path
cp -r packages/lam/backend/build/* $backend_bin_path
cp -r packages/gscrap/service/build/* $gscrap_bin_path
