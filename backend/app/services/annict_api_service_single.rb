class AnnictApiServiceSingle
  def initialize
    @base_url = "https://api.annict.com/v1/works"
    @access_token = ENV["ANNICT_ACCESS_TOKEN"]
  end

  def fetch_anime_data(filter_ids)
    params = {
      fields: "id,title,title_kana,season_name_text,official_site_url,twitter_username,images",
      filter_ids: filter_ids,
      per_page: 1,
      access_token: @access_token
    }
    
    response = Faraday.get("#{@base_url}", params)
    data = JSON.parse(response.body)

    return [] unless data["works"].is_a?(Array)

    format_works_data(data["works"])
  end


  private

  def format_works_data(works)
    formatted_works = works.map do |work|
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
  end

  def extract_year(season_name_text)
    return nil if season_name_text.nil?
    match_data = season_name_text.match(/(\d{4})/)
    if match_data
      match_data[1]
    else
      # season_name_textの内容をログに出力して、どのような値が来ているか確認
      # Rails.logger.info "Unexpected season_name_text format: #{season_name_text}"
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

