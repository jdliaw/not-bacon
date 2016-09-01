require './app/services/style_compiler'

module Api
  module V1
    class StyleResource < BaseResource
      attributes :style_attributes, :publisher_id
      after_save :compile

      def compile
        # simply replace StyleCompiler with SassCompiler to generate Sass file instead of CSS
        sc = StyleCompiler.new(publisher_id, style_attributes)
        sc.save
      end
    end
  end
end
