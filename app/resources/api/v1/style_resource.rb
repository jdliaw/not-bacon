require './app/services/style_compiler'

module Api
  module V1
    class StyleResource < BaseResource
      attributes :style_attributes, :publisher_id
      after_save :compile

      def compile
        sc = StyleCompiler.new(publisher_id, style_attributes)
        sc.save
      end
    end
  end
end
