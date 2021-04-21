changes () {
  git diff --name-only _data/
}
yarn cleanData
    
while read line; do export $line; done < .env.local



if [ -z $WORKER_ACCOUNT ]; then
echo "Git integration not setup";
exit 0
fi

if [ changes ]; then
    git add _data
    git commit -m "Hourly Data Update"
    git push https://$WORKER_ACCOUNT:$WORKER_PASSWORD@$REPO_URL --all
fi  


