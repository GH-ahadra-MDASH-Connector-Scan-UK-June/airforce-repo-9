#include <iostream>
#include <cstdlib>
#include <cstring>
#include <fstream>
#include <string>

void vulnerable_strcpy(const char* input) {
    // Buffer overflow vulnerability
    char buffer[64];
    strcpy(buffer, input);
    std::cout << "Buffer: " << buffer << std::endl;
}

void command_execution(const std::string& user_input) {
    // Command injection
    std::string cmd = "echo " + user_input;
    system(cmd.c_str());
}

void format_string_vuln(const char* user_input) {
    // Format string vulnerability
    printf(user_input);
}

void read_file(const std::string& filename) {
    // Path traversal
    std::string path = "/data/" + filename;
    std::ifstream file(path);
    std::string content((std::istreambuf_iterator<char>(file)),
                         std::istreambuf_iterator<char>());
    std::cout << content << std::endl;
}

int main(int argc, char* argv[]) {
    std::cout << "Airforce C++ Application" << std::endl;
    
    if (argc > 1) {
        vulnerable_strcpy(argv[1]);
        command_execution(argv[1]);
        format_string_vuln(argv[1]);
        read_file(argv[1]);
    }
    
    // Use after free
    int* ptr = new int(42);
    delete ptr;
    std::cout << *ptr << std::endl;
    
    // Memory leak
    char* leaked = new char[1024];
    strcpy(leaked, "This memory is never freed");
    
    return 0;
}
