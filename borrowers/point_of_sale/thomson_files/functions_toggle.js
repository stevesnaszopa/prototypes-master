
// Toggling functionality
var toggleConfig = {};

toggleConfig.toggleExpandClass    = "toggleExpand";
toggleConfig.toggleParentNode     = "body";
toggleConfig.togglerExpandImage   = null;
toggleConfig.togglerCollapseImage = null;
toggleConfig.isMultiToggle        = false;

// Attaches the onclick event to all elements that have a class of, toggler
// doToggle is the function that is called onclick.
function initialiseTogglers(startId)
{
  var starter = $( startId );

  if ( starter )
  {
    var togglers = starter.getElementsByClassName( 'toggler' );

    if ( togglers )
    {
      for(var i = 0, len = togglers.length; i < len; ++i )
      {
        var aToggler = togglers[i];

        aToggler.onclick = function(e)
        {
          doToggle(e);
        };

        var owner = getTogglerOwner( aToggler );

        if ( !owner.hasClassName ( toggleConfig.toggleExpandClass ) )
        {
          toggleChildren( owner, false );
        }
      }
    }
  }
}

// This actually performs the toggling
function doToggle(e)
{
  var sourceElement = whoAmI(e);

  if ( sourceElement )
  {
    var owner = getTogglerOwner( sourceElement );

    // If the current element is expanded then we don't want to process any further.
    if ( !toggleConfig.isMultiToggle && owner.hasClassName( toggleConfig.toggleExpandClass ) )
    {
      return false;
    }

    var parentNode = null;

    if( toggleConfig.isMultiToggle )
    {
      parentNode = owner;
    }
    else
    {
      parentNode = toggleConfig.toggleParentNode;
    }

    resetCurrentToggler( parentNode );
    setToggle(sourceElement);
  }
}

// Resets the current toggler element using the starter element, which is generally the parent node
// of all toggleOwners.
function resetCurrentToggler( starter )
{
  var toggleExpands = $( starter ).getElementsByClassName( toggleConfig.toggleExpandClass );

  if ( toggleExpands )
  {
    // This should really only ever return 1 element, however it has been put into a loop as this
    // could change.
    for (var i = 0, len = toggleExpands.length; i < len; ++i)
    {
      var aToggler = toggleExpands[i];

      setToggle( aToggler );
    }
  }
}

// Gets the toggler owner element
function getTogglerOwner( toggler )
{
  var owner = $( toggler );

  if( owner )
  {
    if( !owner.hasClassName( 'toggleOwner' ) )
    {
      owner = owner.up( '.toggleOwner' );
    }
  }

  return owner;
}

// Sets the toggle based on the current element, and sets the toggling determined by the parameter,
// toggle.
function setToggle(current, toggle)
{
  var owner   = null;
  var toggler = null;

  if ( current.hasClassName( 'toggleOwner' ) )
  {
    owner = $( current );
  }
  else
  {
    owner = getTogglerOwner( current );
  }

  if ( owner )
  {
    var isExpanded = owner.hasClassName( toggleConfig.toggleExpandClass );

    if( !owner.hasClassName( 'toggleImage' ) )
    {
      toggler = owner.down( '.toggleImage' );
    }
    else
    {
      toggler = owner;
    }

    if ( isExpanded )
    {
      owner.removeClassName( toggleConfig.toggleExpandClass );
      toggler.src = toggleConfig.togglerCollapseImage;
    }
    else
    {
      owner.addClassName( toggleConfig.toggleExpandClass );
      toggler.src = toggleConfig.togglerExpandImage;
    }

    var show = true;

    if( toggleConfig.isMultiToggle )
    {
      show = isExpanded;
    }
    else
    {
      show = !isExpanded;
    }

    toggleChildren( owner, show );
  }
}

// Toggles all the child elements determined by the parameter, show.  When true the children are
// shown, otherwise they're hidden.
function toggleChildren( owner, show )
{
  var toggleChildren = owner.getElementsByClassName( 'toggleChild' );

  if ( toggleChildren )
  {
    for (var i = 0, len = toggleChildren.length; i < len; ++i)
    {
      if ( show )
      {
        toggleChildren[i].show();
      }
      else
      {
        toggleChildren[i].hide();
      }
    }
  }
}

function setTogglerExpandImage( newImage )
{
  toggleConfig.togglerExpandImage = newImage;
}

function setTogglerCollapseImage( newImage )
{
  toggleConfig.togglerCollapseImage = newImage;
}

function setIsMultiToggle( isMulti )
{
  toggleConfig.isMultiToggle = isMulti;
}