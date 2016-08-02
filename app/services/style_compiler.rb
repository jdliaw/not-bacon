require 'digest'
require 'erb'

class StyleCompiler
  def initialize(publisher_id, attributes)
    @publisher_id = publisher_id
    @attributes = attributes
  end

  def template
    template = <<-TPL.gsub(/_/, "-").strip_heredoc
      html {
      <% @attributes.each do | attr | -%>
        --<%= attr.keys[0] %>: <%= attr.values[0] %>;
      <% end -%>
      }
    TPL
  end

  def render
    ERB.new(template, nil, '-').result(binding) # third argument enables trim mode to get rid of newlines after -%> tags
  end

  def signature
    Digest::MD5.hexdigest(render)
  end

  def save
    sig = signature
    file = File.open("./app/services/#{sig}.css", "w") do |f|
      f.write(render)
    end
  end
end
