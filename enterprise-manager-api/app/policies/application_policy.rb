class ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def page_permission?(page_name, privilege, exclusion_type)
    default_permission?(page_name, privilege, exclusion_type) || PagePermission.left_outer_joins(:assignments, :permission => :exclusions).where(assignments:{ role: user.roles, "#{privilege}":true }, page_name: page_name, organization: user.organization ).where.not(permissions:{ exclusions: user.exclusions.where(exclusion_type:exclusion_type) } ).size > 0
  end

  def default_permission?(page_name, privilege, exclusion_type)
    user.roles.left_outer_joins(:default_permission => [:assignments, :exclusions]).where(default_permission:{ assignments: { role: user.roles, "#{privilege}": true } }).where.not(permissions:{ exclusions: user.exclusions.where(exclusion_type:exclusion_type) }).first && !PagePermission.find_by(page_name:page_name, organization:user.organization)
  end

  def index?
    user.is_root || page_permission?(record.klass.name, "read_privilege", "readPrivilege")
  end

  def show?
    user.is_root || (Scope.new(user, record.class).resolve.find_by(id:record.id) && page_permission?(record.class.name, "read_privilege", "readPrivilege"))
  end

  def create?
    user.is_root || page_permission?(record.class.name, "create_privilege", "createPrivilege")
  end

  def edit?
    update?
  end

  def destroy?
    false
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      if user.is_root
        scope
      else
        scope.left_outer_joins(:permission => [:assignments, :exclusions]).where(permissions:{ assignments:{ role: user.roles, read_privilege: true } }).where.not(permissions:{ exclusions: user.exclusions.where(exclusion_type:"readPrivilege") } ).distinct
      end
    end
  end
end
