# sop_mng/app

This folder contains the javascript files for the application.

# sop_mng/resources

This folder contains static resources (typically an `"images"` folder as well).

# sop_mng/overrides

This folder contains override classes. All overrides in this folder will be 
automatically included in application builds if the target class of the override
is loaded.

# sop_mng/sass/etc

This folder contains misc. support code for sass builds (global functions, 
mixins, etc.)

# sop_mng/sass/src

This folder contains sass files defining css rules corresponding to classes
included in the application's javascript code build.  By default, files in this 
folder are mapped to the application's root namespace, 'sop_mng'. The
namespace to which files in this directory are matched is controlled by the
app.sass.namespace property in sop_mng/.sencha/app/sencha.cfg. 

# sop_mng/sass/var

This folder contains sass files defining sass variables corresponding to classes
included in the application's javascript code build.  By default, files in this 
folder are mapped to the application's root namespace, 'sop_mng'. The
namespace to which files in this directory are matched is controlled by the
app.sass.namespace property in sop_mng/.sencha/app/sencha.cfg. 
