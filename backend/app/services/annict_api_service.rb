class AnnictApiService
  def initialize
    @base_url = "https://api.annict.com/v1/works"
    @access_token = ENV["ANNICT_ACCESS_TOKEN"]
  end

  def fetch_anime_data(year, season, page = 2)
    response = Faraday.get("#{@base_url}", {
      fields: "id,title,title_kana,season_name_text,official_site_url,twitter_username,images",
      filter_season: "#{year}-#{season}",
      sort_season: 'desc',
      sort_watchers_count: 'desc',
      page: page,
      per_page: 15,
      access_token: @access_token
    })
    data = JSON.parse(response.body)

    return [] unless data["works"].is_a?(Array)

    format_works_data(data["works"])
  end
  
  private

  def format_works_data(works)
    works.map do |work|
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
  end

  def extract_year(season_text)
    # season_textから年を抽出するロジック
     # 文字列から年を抽出するために正規表現を使用
     match = season_text.match(/(\d{4})年/)
     if match
      match[1].to_i  # 年を整数として返す
    else
      nil  # 年が見つからない場合は nil を返す
    end
  end

  def extract_season(season_text)
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
end