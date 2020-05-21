require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

4.times do
  form = Form.create(name:Faker::Team.name, organization: Organization.last)
  field_1 = form.fields.create(name:"Name",field_type:"text")
  field_2 = form.fields.create(name:"Last Name",field_type:"text")
  1000.times do
    Record.create(form_id:form.id,created_at:Faker::Date.between(from: 3.months.ago, to: Date.today),values_attributes:[{record_field_id:field_1.record_field_id, content:Faker::Name.name}, {record_field_id:field_2.record_field_id, content:Faker::Name.last_name}])
  end
end

