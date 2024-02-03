class AnnictApiService
  def initialize
    @base_url = "https://api.annict.com/v1/works"
    @access_token = ENV["ANNICT_ACCESS_TOKEN"]
  end

  def fetch_anime_data(page = 1, search_keyword = nil)
    year, season = current_year_and_season
  params = {
    fields: "id,title,title_kana,season_name_text,official_site_url,twitter_username,images",
    sort_season: 'desc',
    sort_watchers_count: 'desc',
    page: page,
    per_page: 10,
    access_token: @access_token
  }
  
  # 検索キーワードがある場合は、フィルターに追加します
  if search_keyword.present?
    params[:filter_title] = search_keyword
  else
    # 検索キーワードがない場合、デフォルトで現在の季節をフィルターに追加します
    params[:filter_season] = "#{year}-#{season}"
  end

  response = Faraday.get("#{@base_url}", params)
  data = JSON.parse(response.body)
  Rails.logger.info "Response data: #{data}"

  return [] unless data["works"].is_a?(Array)

  format_works_data(data["works"])
end


  private

  def format_works_data(works)
    formatted_works = works.map do |work|
      #twitter_data = work.dig("twitter", "mini_avatar_url")
      #header_photo_url = twitter_data ? twitter_data.sub('profile_image', 'header_photo') : nil

      {
        title: work["title"],
        title_kana: work["title_kana"],
        year: extract_year(work["season_name_text"]),
        season: extract_season(work["season_name_text"]),
        image_url: work.dig("images", "recommended_url").presence || work.dig("twitter", "mini_avatar_url").presence || work.dig("twitter", "normal_avatar_url").presence || work.dig("twitter", "original_avatar_url").presence || work.dig("images", "facebook", "og_image_url").presence || "" ,
        official_site_url: work["official_site_url"],
        twitter_url: work["twitter_username"].present? ? "https://twitter.com/#{work['twitter_username']}" : nil,
        annict_id: work["id"]
      }
    end
    # yearが空でない作品だけを選択
    formatted_works.select { |work| work[:year].present? }
  end

  def extract_year(season_name_text)
  return nil if season_name_text.nil?
  match_data = season_name_text.match(/(\d{4})/)
  if match_data
    match_data[1]
  else
    # season_name_textの内容をログに出力して、どのような値が来ているか確認
    Rails.logger.info "Unexpected season_name_text format: #{season_name_text}"
    nil
  end
end

  def extract_season(season_text)
  # season_textがnilの場合、すぐにnilを返す
  return nil if season_text.nil?
  
  # season_textから季節を抽出するロジック
  case season_text
  when /春/
    'spring'
  when /夏/
    'summer'
  when /秋/
    'autumn'
  when /冬/
    'winter'
  else
    nil  # 季節が見つからない場合は nil を返す
  end
end

def current_year_and_season
  current_time = Time.now
  year = current_time.year
  month = current_time.month

  season = case month
           when 1..3
             'winter'
           when 4..6
             'spring'
           when 7..9
             'summer'
           when 10..12
             'autumn'
           else
             nil
           end
  
  [year, season]
end

end