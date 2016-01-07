all:

release:
	make build-sop-production
	make install-sop-production
	make build-tablet-production
	make install-tablet-production
	make build-sop_mng-production
	make install-sop_mng-production

build-sop-testing:
	make -C sop testing

install-sop-testing:
	install -m 644 build/testing/sop/app.js ../webroot/sop/sop/
	install -m 644 build/testing/sop/index.html ../webroot/sop/sop/
	rsync -a --delete build/testing/sop/resources ../webroot/sop/sop/

build-sop-production:
	make -C sop production

install-sop-production:
	install -m 644 build/production/sop/app.js ../webroot/sop/sop/
	install -m 644 build/production/sop/index.html ../webroot/sop/sop/
	rsync -a --delete build/production/sop/resources ../webroot/sop/sop/

build-tablet-testing:
	make -C sop/tablet testing

install-tablet-testing:
	install -m 644 build/testing/tablet/app.js ../webroot/sop/sop/tablet/
	install -m 644 build/testing/tablet/index.html ../webroot/sop/sop/tablet/
	rsync -a --delete build/testing/tablet/resources ../webroot/sop/sop/tablet/
	rsync -a --delete sop/tablet/inkTool ../webroot/sop/sop/tablet/

build-tablet-production:
	make -C sop/tablet production

install-tablet-production:
	install -m 644 build/production/tablet/app.js         ../webroot/sop/sop/tablet/
	install -m 644 build/production/tablet/app.json       ../webroot/sop/sop/tablet/
	install -m 644 build/production/tablet/index.html     ../webroot/sop/sop/tablet/
	install -m 644 build/production/tablet/microloader.js ../webroot/sop/sop/tablet/
	rsync -a --delete build/production/tablet/resources   ../webroot/sop/sop/tablet/
	rsync -a --delete build/production/tablet/inkTool     ../webroot/sop/sop/tablet/

build-sop_mng-testing:
	make -C sop_mng testing

install-sop_mng-testing:
	install -m 644 build/testing/sop_mng/app.js ../webroot/sop/sop_mng/
	install -m 644 build/testing/sop_mng/index.html ../webroot/sop/sop_mng/
	rsync -a --delete build/testing/sop_mng/resources ../webroot/sop/sop_mng/

build-sop_mng-production:
	make -C sop_mng production

install-sop_mng-production:
	install -m 644 build/production/sop_mng/app.js ../webroot/sop/sop_mng/
	install -m 644 build/production/sop_mng/index.html ../webroot/sop/sop_mng/
	rsync -a --delete build/production/sop_mng/resources ../webroot/sop/sop_mng/

js-beautify:
	@find sop/app sop/tablet/app sop_mng/app -name '*.js' -print0 | xargs -0 js-beautify -nr
