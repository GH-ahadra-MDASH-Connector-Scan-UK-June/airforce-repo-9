require 'sinatra'
require 'sqlite3'
require 'open-uri'
require 'yaml'

db = SQLite3::Database.new("airforce.db")

get '/search' do
  query = params[:q]
  # SQL Injection
  results = db.execute("SELECT * FROM items WHERE name = '#{query}'")
  results.to_s
end

get '/exec' do
  cmd = params[:cmd]
  # Command injection
  output = `#{cmd}`
  output
end

get '/fetch' do
  url = params[:url]
  # SSRF
  content = URI.open(url).read
  content
end

post '/parse' do
  data = request.body.read
  # Unsafe YAML deserialization
  obj = YAML.load(data)
  obj.to_s
end

get '/render' do
  template = params[:template]
  # Server-side template injection
  erb template
end
