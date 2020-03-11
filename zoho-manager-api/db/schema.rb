# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_03_11_170821) do

  create_table "accounts", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.string "accountable_type"
    t.integer "accountable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["accountable_type", "accountable_id"], name: "index_accounts_on_accountable_type_and_accountable_id"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.integer "record_id", null: false
    t.integer "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "admins", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_admins_on_organization_id"
  end

  create_table "checkbox_options", force: :cascade do |t|
    t.integer "option_id"
    t.integer "value_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["option_id"], name: "index_checkbox_options_on_option_id"
    t.index ["value_id"], name: "index_checkbox_options_on_value_id"
  end

  create_table "employees", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "admin_id"
    t.index ["admin_id"], name: "index_employees_on_admin_id"
  end

  create_table "fields", force: :cascade do |t|
    t.integer "field_type"
    t.string "name"
    t.integer "form_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["form_id"], name: "index_fields_on_form_id"
  end

  create_table "forms", force: :cascade do |t|
    t.string "name"
    t.integer "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "form_alias"
    t.integer "records_count"
    t.index ["organization_id"], name: "index_forms_on_organization_id"
  end

  create_table "integrations", force: :cascade do |t|
    t.integer "type"
    t.string "auth_token"
    t.integer "organization_id"
    t.integer "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_integrations_on_account_id"
    t.index ["organization_id"], name: "index_integrations_on_organization_id"
  end

  create_table "key_values", force: :cascade do |t|
    t.integer "record_key_id"
    t.integer "record_value_id"
    t.integer "option_id"
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["option_id"], name: "index_key_values_on_option_id"
    t.index ["record_key_id"], name: "index_key_values_on_record_key_id"
    t.index ["record_value_id"], name: "index_key_values_on_record_value_id"
  end

  create_table "managers", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "admin_id"
    t.index ["admin_id"], name: "index_managers_on_admin_id"
  end

  create_table "options", force: :cascade do |t|
    t.integer "field_id"
    t.integer "record_field_id"
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["field_id"], name: "index_options_on_field_id"
    t.index ["record_field_id"], name: "index_options_on_record_field_id"
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "record_fields", force: :cascade do |t|
    t.integer "field_type"
    t.string "name"
    t.integer "form_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "field_id"
    t.index ["field_id"], name: "index_record_fields_on_field_id"
    t.index ["form_id"], name: "index_record_fields_on_form_id"
  end

  create_table "record_keys", force: :cascade do |t|
    t.integer "field_id"
    t.integer "resource_field_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["field_id"], name: "index_record_keys_on_field_id"
    t.index ["resource_field_id"], name: "index_record_keys_on_resource_field_id"
  end

  create_table "records", force: :cascade do |t|
    t.integer "form_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["form_id"], name: "index_records_on_form_id"
  end

  create_table "selectable_resources", force: :cascade do |t|
    t.integer "form_id"
    t.integer "resource_field_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "record_field_id"
    t.integer "field_id"
    t.index ["field_id"], name: "index_selectable_resources_on_field_id"
    t.index ["form_id"], name: "index_selectable_resources_on_form_id"
    t.index ["record_field_id"], name: "index_selectable_resources_on_record_field_id"
    t.index ["resource_field_id"], name: "index_selectable_resources_on_resource_field_id"
  end

  create_table "values", force: :cascade do |t|
    t.integer "organization_id"
    t.string "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "record_field_id"
    t.integer "record_id"
    t.integer "field_id"
    t.integer "record_value_id"
    t.integer "option_id"
    t.integer "key_value_id"
    t.index ["field_id"], name: "index_values_on_field_id"
    t.index ["key_value_id"], name: "index_values_on_key_value_id"
    t.index ["option_id"], name: "index_values_on_option_id"
    t.index ["organization_id"], name: "index_values_on_organization_id"
    t.index ["record_field_id"], name: "index_values_on_record_field_id"
    t.index ["record_id"], name: "index_values_on_record_id"
    t.index ["record_value_id"], name: "index_values_on_record_value_id"
  end

end
