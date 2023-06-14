#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>

//maximum application buffer
#define APP_MAX_BUFFER 1024
#define PORT 8080

int main (){
    //define the server and client file descriptors
    int server_fd, client_fd;

    //define the socket address
    struct sockaddr_in address;
    int address_len = sizeof(address);

    //define the application buffer where we receive the requests
    //data will be moved from receive buffer to here
    char buffer[APP_MAX_BUFFER] = {0};


    // Create socket
    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
        perror("Socket failed");
        exit(EXIT_FAILURE);
    }
 
    // Bind socket 
    address.sin_family = AF_INET; //ipv4
    address.sin_addr.s_addr = INADDR_ANY; // listen 0.0.0.0 interfaces 
    address.sin_port = htons(PORT); 


    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
        perror("Bind failed");
        exit(EXIT_FAILURE);
    }


    // Creates the queues 
    // Listen for clients, with 10 backlog (10 connections in accept queue)
    if (listen(server_fd, 10) < 0) {
        perror("Listen failed");
        exit(EXIT_FAILURE);
    }
    
    //[C,C,C,C,C,C,C,C,C,C]

    //we loop forever
    while (1){
        printf("\nWaiting for a connection...\n");

        // Accept a client connection client_fd == connection
        // this blocks
        //if the accept queue is empty, we are stuck here.. 
        if ((client_fd = accept(server_fd, (struct sockaddr *)&address, (socklen_t*)&address_len)) < 0) {
            perror("Accept failed");
            exit(EXIT_FAILURE);
        }


        // read data from the OS receive buffer to the application (buffer)
        //this is essentially reading the HTTP request
        //don't bite more than you chew APP_MAX_BUFFER

        read(client_fd, buffer, APP_MAX_BUFFER);
        printf("%s\n", buffer);
     
        // We send the request by writing to the socket send buffer in the OS
        char *http_response = "HTTP/1.1 200 OK\n"
                      "Content-Type: text/plain\n"
                      "Content-Length: 14\n\n"
                      "Hello world!\n";

        //write to the socket
        //send queue os
        write(client_fd, http_response, strlen(http_response));
         
   
        //simulate slow response  
        //wait for 6 seconds and then unblock 

        sleep(6);


        write(client_fd, "!", 1);
        //close the client socket (terminate the TCP connection)
        close(client_fd);
    }

    return 0;
}