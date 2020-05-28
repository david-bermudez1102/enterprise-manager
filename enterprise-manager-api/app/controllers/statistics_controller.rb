class StatisticsController < ApplicationController
  before_action :authenticate_user
  before_action :set_organization
  before_action :set_form

  # GET /statistics
  def index
    statistics = Statistic.with_filters(filterable_params,@form)
    render json: statistics
  end

  # GET /statistics/1
  def show
    render json: @statistic
  end

  # POST /statistics
  def create
    @statistic = Statistic.new(statistic_params)

    if @statistic.save
      render json: @statistic, status: :created, location: @statistic
    else
      render json: @statistic.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /statistics/1
  def update
    if @statistic.update(statistic_params)
      render json: @statistic
    else
      render json: @statistic.errors, status: :unprocessable_entity
    end
  end

  # DELETE /statistics/1
  def destroy
    @statistic.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
  def set_organization
    @organization = current_account.organization
  end

  def set_form
    @form = @organization.forms.find_by(id: params[:form_id])
  end

  def filterable_params
    params.slice(:month_year, :from_date, :date_range, :current_month, :date, :query, :column_id)
  end
end
