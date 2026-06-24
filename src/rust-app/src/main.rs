use std::process::Command;
use std::fs;
use std::io::{self, Read};
use std::path::Path;

fn execute_command(user_input: &str) -> String {
    // Command injection vulnerability
    let output = Command::new("sh")
        .arg("-c")
        .arg(user_input)
        .output()
        .expect("Failed to execute command");
    
    String::from_utf8_lossy(&output.stdout).to_string()
}

fn read_user_file(filename: &str) -> String {
    // Path traversal vulnerability
    let path = format!("/data/{}", filename);
    fs::read_to_string(&path).unwrap_or_else(|_| "File not found".to_string())
}

fn unsafe_format(user_input: &str) -> String {
    // Format string vulnerability
    format!("{}", user_input)
}

fn main() {
    println!("Airforce Rust Application");
    
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    
    let result = execute_command(&input.trim());
    println!("Command output: {}", result);
    
    let file_content = read_user_file(&input.trim());
    println!("File content: {}", file_content);
}
