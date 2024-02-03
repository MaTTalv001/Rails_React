class WorksController < ApplicationController
  def index
    annict_api_service = AnnictApiService.new
    page = params[:page] || 1
    search_keyword = params[:search_keyword] || nil

    filter_season = params[:filter_season] || nil

    Rails.logger.info "filter_season from params: #{params[:filter_season]}"

     @works = annict_api_service.fetch_anime_data(page, search_keyword, filter_season)
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
