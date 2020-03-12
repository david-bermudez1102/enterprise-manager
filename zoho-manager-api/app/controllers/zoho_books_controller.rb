class ZohoBooksController < ApplicationController
 require 'httparty'
 def index
  headers = { 
  "Authorization" => "Bearer 1000.1607a123833158717ce37d85f6072754.b5cb705f26ed275bf3569a88b5c41294" 
}
 response = HTTParty.get('https://books.zoho.com/api/v3/items?organization_id=710756433', headers: headers)
 render json: response
 end

end
