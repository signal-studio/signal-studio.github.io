
#
# Binaries
#
BIN := ./node_modules/.bin

#
# Variables
#

PORT    = 8080

SOURCE  = ./source
BUILD   = ./build

SCRIPTS = $(shell find $(SOURCE)/js -type f -name '*.js' -o -name '*.html')

#
# Tasks
#

build: node_modules assets scripts styles

develop:
	@serve $(BUILD) -p $(PORT)

clean:
	@rm -rf $(BUILD)

clean-deps:
	@rm -rf node_modules

#
# Shorthands
#

install: node_modules
assets: build/index.html build/assets/ping.mp3
scripts: build/assets/index.js
styles: build/assets/styles.css

#
# Targets
#

node_modules: package.json
	@npm install


$(BUILD)/assets/%: $(SOURCE)/assets/%
	@mkdir -p $(@D)
	@cp $< $@

$(BUILD)/%: $(SOURCE)/%
	@mkdir -p $(@D)
	@cp $< $@

# Compile scripts with Duo
$(BUILD)/assets/index.js: $(SCRIPTS)
	@mkdir -p $(@D)
	@browserify $(SOURCE)/js/index.js -t babelify -t partialify > $@

# Compile styles with sass
$(BUILD)/assets/styles.css: $(SOURCE)/css/styles.css
	@mkdir -p $(@D)
	@cp $(SOURCE)/css/styles.css $@

.PHONY: all build clean assets scripts styles
