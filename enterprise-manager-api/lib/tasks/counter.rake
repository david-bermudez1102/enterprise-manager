namespace :counters do
  task update: :environment do
    Form.find_each do |form|
      Form.reset_counters(form.id, :records)
    end
  end
end