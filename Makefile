
# Binaries
BIN := ./node_modules/.bin

# Variables
SOURCE = source
DEST = build
STYLES = $(shell find $(SOURCE)/css -type f -name '*.scss')
SCRIPTS = $(shell find $(SOURCE)/js -type f -name '*.js' -o -name '*.html')

# Default tasks
all: build
	@true
build: assets scripts styles
assets: build/index.html build/assets/ping.mp3
scripts: build/assets/index.js
styles: build/assets/styles.css


# Copy assets
$(DEST)/assets/%: $(SOURCE)/assets/%
	@mkdir -p $(@D)
	@cp $< $@

$(DEST)/index.html: $(SOURCE)/index.html
	@mkdir -p $(@D)
	@cp $< $@

# Compile scripts with Duo
$(DEST)/assets/index.js: $(SCRIPTS)
	@mkdir -p $(@D)
	@browserify $(SOURCE)/js/index.js -t babelify -t partialify > $@


# Compile styles with sass
$(DEST)/assets/styles.css: $(STYLES)
	@mkdir -p $(@D)
	@sassc --sourcemap --load-path $(SOURCE)/css/ $(SOURCE)/css/styles.scss $@
	@autoprefixer $@ --clean --browsers "last 2 versions"

# Clean built directories
clean:
	@rm -rf $(DEST)
	@rm -rf node_modules

.PHONY: all build clean assets scripts styles