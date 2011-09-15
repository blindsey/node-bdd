require 'rake'

desc "Run the JavaScript specs"
task :spec do
  sh './node_modules/jasmine-node/bin/jasmine-node spec/'
end

namespace :spec do
  desc "Run the Javascript coffee specs"
  task :coffee do
    sh './node_modules/jasmine-node/bin/jasmine-node --coffee spec/coffee'
  end
end

task :default => :spec
