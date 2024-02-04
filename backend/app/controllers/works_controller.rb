class WorksController < ApplicationController
  def index
    annict_api_service = AnnictApiService.new
    annict_api_service_cast = AnnictApiServiceCast.new
    page = params[:page] || 1
    search_keyword = params[:search_keyword] || nil
    filter_season = params[:filter_season] || nil
    @works = annict_api_service.fetch_anime_data(page, search_keyword, filter_season)
    #@casts = annict_api_service_cast.fetch_cast_data(@works)

    #@works.each do |work|
      # 対応するキャスト情報を @casts から検索し、work の :annict_id と一致する :work_id を持つキャストのみ選択
      #matching_casts = @casts.select { |cast| cast[:work_id] == work[:annict_id] }
      # 該当するキャスト情報を work に追加
      #work[:casts] = matching_casts
    #end
    
    render json: @works
  end

  def show
    annict_api_service_single = AnnictApiServiceSingle.new
    annict_api_service_cast = AnnictApiServiceCast.new
    annict_id = params[:id]
    @work = annict_api_service_single.fetch_anime_data(annict_id)
    @casts = annict_api_service_cast.fetch_cast_data(@work)
    @work.each do |work|
      # 対応するキャスト情報を @casts から検索し、work の :annict_id と一致する :work_id を持つキャストのみ選択
      matching_casts = @casts.select { |cast| cast[:work_id] == work[:annict_id] }
      # 該当するキャスト情報を work に追加
      work[:casts] = matching_casts
    end
    render json: @work[0]
  end

  private

  def year_param
    params[:year] || 2023 # デフォルト値を設定
  end

  def season_param
    params[:year] || "winter" # デフォルト値を設定
  end  
end
