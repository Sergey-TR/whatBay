pipeline {
    agent any

    stages {

        stage('Copy build'){
            when {
                anyOf {
                    branch "dev";
                }
            }

            steps {
                sh 'nohup killall node > /home/bitrix/ext_www/dev_nohup/killall_out.txt 2>&1 &';
				sh '/home/bitrix/ext_www/dev_nohup/main.sh'
            }
        }

        stage('Run') {
            when {
                anyOf {
                    branch "dev";
                }
            }

            steps {
                sh 'cp /home/bitrix/ext_www/dev_nohup/tmp_file /home/bitrix/ext_www/dev_nohup/wait_install';
                sh 'chown bitrix:bitrix /home/bitrix/ext_www/dev_nohup/wait_install';
                sh '/home/bitrix/ext_www/dev_nohup/script.sh'
//                sh 'pwd';
//                sh 'whoami';
//                sh '/home/bitrix/ext_www/dev_nohup/start.sh'

//                sh 'chmod -R 775 /home/bitrix/ext_www/dev.gruppa4.ru/node_modules'
//                sh 'nohup json-server --watch /home/bitrix/ext_www/dev.gruppa4.ru/db.json --host 192.168.10.11 > /home/bitrix/ext_www/dev_nohup/json_serv_out.txt 2>&1 &';
//                sh 'nohup npm run --prefix /home/bitrix/ext_www/dev.gruppa4.ru serve -- --port 12005  > /home/bitrix/ext_www/dev_nohup/npm_serv_out.txt 2>&1 &';
            }
        }

        stage ('Success') {
            when {
                anyOf {
                    branch "master";
                    branch "dev";
                    branch "staging";
                }
            }

            steps{
                echo 'Done!'
            }
        }
    }
}