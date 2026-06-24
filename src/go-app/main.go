package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"os/exec"
	"io/ioutil"
	"path/filepath"
	
	_ "github.com/lib/pq"
)

func handler(w http.ResponseWriter, r *http.Request) {
	userInput := r.URL.Query().Get("input")
	
	// Command injection
	cmd := exec.Command("sh", "-c", userInput)
	output, _ := cmd.Output()
	fmt.Fprintf(w, "Output: %s", output)
}

func dbHandler(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	
	// SQL Injection
	db, _ := sql.Open("postgres", "postgres://localhost/airforce?sslmode=disable")
	query := fmt.Sprintf("SELECT * FROM users WHERE name = '%s'", name)
	rows, _ := db.Query(query)
	defer rows.Close()
	
	fmt.Fprintf(w, "Query executed")
}

func fileHandler(w http.ResponseWriter, r *http.Request) {
	filename := r.URL.Query().Get("file")
	// Path traversal
	path := filepath.Join("/data", filename)
	content, _ := ioutil.ReadFile(path)
	w.Write(content)
}

func main() {
	http.HandleFunc("/exec", handler)
	http.HandleFunc("/db", dbHandler)
	http.HandleFunc("/file", fileHandler)
	fmt.Println("Server starting on :8080")
	http.ListenAndServe(":8080", nil)
}
