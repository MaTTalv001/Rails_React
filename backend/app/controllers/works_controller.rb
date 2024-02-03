class WorksController < ApplicationController
  def index
    annict_api_service = AnnictApiService.new
    page = params[:page] || 1
    @works = annict_api_service.fetch_anime_data(year_param, season_param, page) # start_year_paramは適宜設定
    # この@worksをReactコンポーネントに渡す
    render json: @works
  end

  private

  def year_param
    params[:year] || 2023 # デフォルト値を設定
  end

  def season_param
    params[:year] || "winter" # デフォルト値を設定
  end
end
