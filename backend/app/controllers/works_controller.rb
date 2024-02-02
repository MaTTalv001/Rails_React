class WorksController < ApplicationController
  def index
    annict_api_service = AnnictApiService.new
    @works = annict_api_service.fetch_anime_data(start_year_param) # start_year_paramは適宜設定
    # この@worksをReactコンポーネントに渡す
    render json: @works
  end

  private

  def start_year_param
    params[:start_year] || 2024 # デフォルト値を設定
  end
end
