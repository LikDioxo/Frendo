### The Frendo Pizzeria Setuping Guide

- pull changes
- change username and password in .env file (postgres:1111 change to yours)
- make migrations using command: php bin\console make:migration
- migrate changes to your DB: php bin\console doctrine:migration:migrate

### The Frendo Pizzeria Setuping Guide

####Using nginx server and php-cgi

 - insert following code to your nginx.conf file:


    worker_processes  1;
    
    
    events {
    worker_connections  1024;
    }
    
    http {
    include       mime.types;
    default_type  application/octet-stream;
    
    
        sendfile        on;
    
        keepalive_timeout  65;
    
    
        server {
        listen 80;
        listen [::]:80;
    
        server_name localhost;
        root path_to_project_folder\frendo\public;
        index index.php;
        client_max_body_size 100m;
    
        location / {
            try_files $uri $uri/ /index.php$is_args$args;
        }
    
        location ~ \.php {
            try_files $uri /index.php =404;
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            fastcgi_param SCRIPT_NAME $fastcgi_script_name;
            fastcgi_split_path_info ^(.+\.php)(/.+)$;
            fastcgi_index index.php;
            include fastcgi_params;
          }
    
        location ~ /\.(?:ht|git|svn) {
            deny all;
        }
    }

 - define `path_to_project_folder` in `nginx.conf `
 - run `nxinx.exe` in nginx instalation folder
 - run php-cgi server: `php-cgi.exe -b 127.0.0.1:9000`
