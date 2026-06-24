using System;
using System.Data.SqlClient;
using System.IO;

namespace AirforceConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Airforce Console Application");
            string userInput = Console.ReadLine();
            
            // SQL Injection vulnerability (for code scanning detection)
            string query = "SELECT * FROM users WHERE name = '" + userInput + "'";
            var connection = new SqlConnection("Server=localhost;Database=test;");
            var command = new SqlCommand(query, connection);
            
            // Path traversal vulnerability
            string filePath = Path.Combine("/data/", userInput);
            string content = File.ReadAllText(filePath);
            Console.WriteLine(content);
        }
    }
}
