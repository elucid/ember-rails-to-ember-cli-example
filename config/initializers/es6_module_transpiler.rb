prefix = 'es6-spike'

ES6ModuleTranspiler.add_prefix_pattern Regexp.new(File.join(Rails.root, 'app/assets/javascripts')), prefix

ES6ModuleTranspiler.transform = lambda do |name|
  name_parts = name.downcase.sub("#{prefix}/", '').split(/[^a-z]/)
  has_suffix = name_parts.length > 1 && name_parts.first.chomp('s') == name_parts.last
  bad_characters = name.match(/[^a-z\d\/\-]/)

  if bad_characters or has_suffix
    raise NameError.new %Q[Module name "#{name}" is incompatible with ember-cli naming conventions]
  end

  name
end
