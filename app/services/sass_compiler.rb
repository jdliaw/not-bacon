require 'digest'
require 'erb'

class SassCompiler
  def initialize(publisher_id, attributes)
    @publisher_id = publisher_id
    @attributes = attributes
  end

  def template
    # ugly spacing for the ruby code in the template because of whitespace generated
    template = <<-TPL.strip_heredoc
      html {
      <% @attributes.each do | attr | -%>
      <% if attr[0].to_s == 'variables' -%>
      <% attr[1].each do | var | -%>
        $<%= var[0].to_s.dasherize %>: <%= var[1] %>;
      <% end -%>
      <% else -%>
        .<%= attr[0].to_s.dasherize %> {
      <% attr[1].each do | var | -%>
          <%= var[0].to_s.dasherize %>: <%= var[1] %>;
      <% end -%>
        }
      <% end -%>
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
    file = File.open("./app/services/#{sig}.scss", "w") do |f|
      f.write(render)
    end
  end
end