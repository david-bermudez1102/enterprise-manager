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

ActiveRecord::Schema.define(version: 2020_07_12_200838) do

  create_table "account_roles", force: :cascade do |t|
    t.integer "account_id"
    t.integer "role_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_account_roles_on_account_id"
    t.index ["role_id"], name: "index_account_roles_on_role_id"
  end

  create_table "accounts", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.integer "root_id"
    t.string "accountable_type"
    t.integer "accountable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "avatar_margin_left"
    t.float "avatar_margin_top"
    t.integer "organization_id"
    t.boolean "activated"
    t.boolean "disabled", default: false, null: false
    t.integer "failed_attempts", default: 0, null: false
    t.boolean "locked", default: false, null: false
    t.index ["accountable_type", "accountable_id"], name: "index_accounts_on_accountable_type_and_accountable_id"
    t.index ["organization_id"], name: "index_accounts_on_organization_id"
    t.index ["root_id"], name: "index_accounts_on_root_id"
  end

  create_table "activations", force: :cascade do |t|
    t.integer "account_id"
    t.text "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_activations_on_account_id"
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

  create_table "assignments", force: :cascade do |t|
    t.boolean "create_privilege", default: false, null: false
    t.boolean "update_privilege", default: false, null: false
    t.boolean "delete_privilege", default: false, null: false
    t.boolean "insert_privilege", default: false, null: false
    t.boolean "read_privilege", default: false, null: false
    t.integer "role_id"
    t.integer "permission_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["permission_id"], name: "index_assignments_on_permission_id"
    t.index ["role_id"], name: "index_assignments_on_role_id"
  end

  create_table "checkbox_options", force: :cascade do |t|
    t.integer "option_id"
    t.integer "value_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["option_id"], name: "index_checkbox_options_on_option_id"
    t.index ["value_id"], name: "index_checkbox_options_on_value_id"
  end

  create_table "comments", force: :cascade do |t|
    t.string "commentable_type"
    t.integer "commentable_id"
    t.text "content"
    t.integer "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_comments_on_account_id"
    t.index ["commentable_type", "commentable_id"], name: "index_comments_on_commentable_type_and_commentable_id"
  end

  create_table "connections", force: :cascade do |t|
    t.string "name"
    t.integer "integration_id"
    t.integer "form_id"
    t.integer "connection_type"
    t.integer "zoho_connection_id"
    t.integer "quickbooks_connection_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["form_id"], name: "index_connections_on_form_id"
    t.index ["integration_id"], name: "index_connections_on_integration_id"
    t.index ["quickbooks_connection_id"], name: "index_connections_on_quickbooks_connection_id"
    t.index ["zoho_connection_id"], name: "index_connections_on_zoho_connection_id"
  end

  create_table "conversations", force: :cascade do |t|
    t.text "render_key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "default_permissions", force: :cascade do |t|
    t.integer "role_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["role_id"], name: "index_default_permissions_on_role_id"
  end

  create_table "exclusions", force: :cascade do |t|
    t.integer "account_id"
    t.integer "permission_id"
    t.integer "exclusion_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_exclusions_on_account_id"
    t.index ["permission_id"], name: "index_exclusions_on_permission_id"
  end

  create_table "field_dependents", force: :cascade do |t|
    t.integer "field_id"
    t.integer "dependent_field_id"
    t.integer "resource_field_id"
    t.integer "sub_dependent_id"
    t.integer "sub_dependent_option_id"
    t.boolean "all_values_same_operation", default: true, null: false
    t.integer "operation"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dependent_field_id"], name: "index_field_dependents_on_dependent_field_id"
    t.index ["field_id"], name: "index_field_dependents_on_field_id"
    t.index ["resource_field_id"], name: "index_field_dependents_on_resource_field_id"
    t.index ["sub_dependent_id"], name: "index_field_dependents_on_sub_dependent_id"
    t.index ["sub_dependent_option_id"], name: "index_field_dependents_on_sub_dependent_option_id"
  end

  create_table "fields", force: :cascade do |t|
    t.integer "field_type"
    t.string "name"
    t.integer "form_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "field_alias"
    t.boolean "is_required"
    t.string "default_value"
    t.boolean "accepts_decimals", default: false, null: false
    t.text "combined_fields", default: "--- []\n"
    t.integer "field_format"
    t.string "zoho_field_name"
    t.boolean "is_uniq", default: false, null: false
    t.boolean "hidden_in_form", default: false, null: false
    t.boolean "hidden_in_records", default: false, null: false
    t.boolean "allow_updates", default: true, null: false
    t.boolean "read_only", default: false, null: false
    t.integer "min_length", default: 0
    t.integer "max_length", default: 140
    t.integer "position", default: 0, null: false
    t.index ["form_id"], name: "index_fields_on_form_id"
  end

  create_table "forms", force: :cascade do |t|
    t.string "name"
    t.integer "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "form_alias"
    t.integer "records_count"
    t.text "fields_order", default: "--- []\n"
    t.index ["organization_id"], name: "index_forms_on_organization_id"
  end

  create_table "integration_records", force: :cascade do |t|
    t.integer "connection_id"
    t.string "external_id"
    t.integer "record_id"
    t.integer "zoho_integration_record_id"
    t.integer "quickbooks_integration_record_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["connection_id"], name: "index_integration_records_on_connection_id"
    t.index ["quickbooks_integration_record_id"], name: "index_integration_records_on_quickbooks_integration_record_id"
    t.index ["record_id"], name: "index_integration_records_on_record_id"
    t.index ["zoho_integration_record_id"], name: "index_integration_records_on_zoho_integration_record_id"
  end

  create_table "integrations", force: :cascade do |t|
    t.string "external_organization_id"
    t.string "client_id"
    t.string "client_secret"
    t.string "redirect_uri"
    t.string "auth_token"
    t.integer "organization_id"
    t.integer "account_id"
    t.integer "zoho_integration_id"
    t.integer "quickbooks_integration_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "refresh_token"
    t.index ["account_id"], name: "index_integrations_on_account_id"
    t.index ["organization_id"], name: "index_integrations_on_organization_id"
    t.index ["quickbooks_integration_id"], name: "index_integrations_on_quickbooks_integration_id"
    t.index ["zoho_integration_id"], name: "index_integrations_on_zoho_integration_id"
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

  create_table "likes", force: :cascade do |t|
    t.string "likeable_type"
    t.integer "likeable_id"
    t.integer "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_likes_on_account_id"
    t.index ["likeable_type", "likeable_id"], name: "index_likes_on_likeable_type_and_likeable_id"
  end

  create_table "messages", force: :cascade do |t|
    t.integer "conversation_id"
    t.integer "account_id"
    t.text "content"
    t.boolean "is_read", default: false, null: false
    t.text "render_key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_messages_on_account_id"
    t.index ["conversation_id"], name: "index_messages_on_conversation_id"
  end

  create_table "minimized_conversations", force: :cascade do |t|
    t.integer "conversation_id"
    t.integer "account_id"
    t.boolean "is_minimized", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_minimized_conversations_on_account_id"
    t.index ["conversation_id"], name: "index_minimized_conversations_on_conversation_id"
  end

  create_table "open_conversations", force: :cascade do |t|
    t.integer "conversation_id"
    t.integer "account_id"
    t.boolean "is_open", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_open_conversations_on_account_id"
    t.index ["conversation_id"], name: "index_open_conversations_on_conversation_id"
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

  create_table "organization_roots", force: :cascade do |t|
    t.integer "organization_id"
    t.integer "root_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_organization_roots_on_organization_id"
    t.index ["root_id"], name: "index_organization_roots_on_root_id"
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name"
    t.float "logo_margin_left"
    t.float "logo_margin_top"
    t.float "logo_width_ratio"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "page_permissions", force: :cascade do |t|
    t.integer "page_name"
    t.integer "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_page_permissions_on_organization_id"
  end

  create_table "permissions", force: :cascade do |t|
    t.string "permissionable_type"
    t.integer "permissionable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["permissionable_type", "permissionable_id"], name: "index_permissions_on_permissionable_type_and_permissionable_id"
  end

  create_table "record_fields", force: :cascade do |t|
    t.integer "field_type"
    t.string "name"
    t.integer "form_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "field_id"
    t.string "field_alias"
    t.boolean "is_required"
    t.string "default_value"
    t.boolean "accepts_decimals", default: false, null: false
    t.text "combined_fields", default: "--- []\n"
    t.integer "field_format"
    t.string "zoho_field_name"
    t.boolean "is_uniq", default: false, null: false
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
    t.boolean "is_deleted", default: false, null: false
    t.integer "account_id"
    t.index ["account_id"], name: "index_records_on_account_id"
    t.index ["form_id"], name: "index_records_on_form_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.integer "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_roles_on_organization_id"
  end

  create_table "roots", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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

  create_table "statistics", force: :cascade do |t|
    t.integer "form_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["form_id"], name: "index_statistics_on_form_id"
  end

  create_table "stories", force: :cascade do |t|
    t.string "storiable_type"
    t.integer "storiable_id"
    t.integer "account_id"
    t.integer "organization_id"
    t.integer "action"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_stories_on_account_id"
    t.index ["organization_id"], name: "index_stories_on_organization_id"
    t.index ["storiable_type", "storiable_id"], name: "index_stories_on_storiable_type_and_storiable_id"
  end

  create_table "typing_conversations", force: :cascade do |t|
    t.integer "conversation_id"
    t.integer "account_id"
    t.boolean "is_typing", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_typing_conversations_on_account_id"
    t.index ["conversation_id"], name: "index_typing_conversations_on_conversation_id"
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
    t.integer "account_id"
    t.index ["account_id"], name: "index_values_on_account_id"
    t.index ["field_id"], name: "index_values_on_field_id"
    t.index ["key_value_id"], name: "index_values_on_key_value_id"
    t.index ["option_id"], name: "index_values_on_option_id"
    t.index ["organization_id"], name: "index_values_on_organization_id"
    t.index ["record_field_id"], name: "index_values_on_record_field_id"
    t.index ["record_id"], name: "index_values_on_record_id"
    t.index ["record_value_id"], name: "index_values_on_record_value_id"
  end

end
