class Test 
	def self.abc()
		pr = Proc.new{
			
			2.times do
				puts "hello"
			end

		}
		pr.call
	end
	def self.method_missing pd
		puts "sorry"
	end 
end


Test.abc