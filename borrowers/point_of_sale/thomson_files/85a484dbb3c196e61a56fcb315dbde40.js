Bootstrapper.bindDOMParsed(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;var ck=function(param){var c=document.cookie;var s=param+"\x3d";return c.indexOf(s)==-1?"":c.substring(c.indexOf(s)+s.length,c.indexOf("|",c.indexOf(s)))};window.pqry="";window.pqryArray=[];var ens_pulseUUID=Bootstrapper.dataManager.getDataElement("PulseData","uuid");if(typeof ens_pulseUUID==="string"&&ens_pulseUUID!=="")pqryArray.push("PULID%3D"+ens_pulseUUID);if(typeof tui!==
"undefined")if(typeof tui.analytics!=="undefined"){if(typeof tui.analytics.page.WhereTo!=="undefined")pqryArray.push("WhereTo%3D"+tui.analytics.page.WhereTo);if(typeof tui.analytics.page.DepAir!=="undefined")pqryArray.push("DepAir%3D"+tui.analytics.page.DepAir);if(typeof tui.analytics.page.DepDate!=="undefined")pqryArray.push("DepDate%3D"+tui.analytics.page.DepDate);if(typeof tui.analytics.page.MonthYear!=="undefined")pqryArray.push("MonthYear%3D"+tui.analytics.page.MonthYear);if(typeof tui.analytics.page.FlexDate!==
"undefined")pqryArray.push("FlexDate%3D"+tui.analytics.page.FlexDate);if(typeof tui.analytics.page.Adults!=="undefined")pqryArray.push("Adults%3D"+tui.analytics.page.Adults);if(typeof tui.analytics.page.Infants!=="undefined")pqryArray.push("Infants%3D"+tui.analytics.page.Infants);if(typeof tui.analytics.page.Children!=="undefined")pqryArray.push("Children%3D"+tui.analytics.page.Children);if(typeof tui.analytics.page.Dur!=="undefined")pqryArray.push("Dur%3D"+tui.analytics.page.Dur);if(typeof tui.analytics.page.Results!==
"undefined")pqryArray.push("Results%3D"+tui.analytics.page.Results);if(typeof tui.analytics.page.SchScope!=="undefined")pqryArray.push("SchScope%3D"+tui.analytics.page.SchScope);if(typeof tui.analytics.page.Party!=="undefined")pqryArray.push("Party%3D"+tui.analytics.page.Party);if(typeof tui.analytics.page.Sum!=="undefined")pqryArray.push("Sum%3D"+tui.analytics.page.Sum);if(typeof tui.analytics.page.Disc!=="undefined")pqryArray.push("Disc%3D"+tui.analytics.page.Disc);if(typeof tui.analytics.page.LimAvB!==
"undefined")pqryArray.push("LimAvB%3D"+tui.analytics.page.LimAvB);if(typeof tui.analytics.page.DreamFl!=="undefined")pqryArray.push("DreamFl%3D"+tui.analytics.page.DreamFl);if(typeof tui.analytics.page.OrigPos!=="undefined")pqryArray.push("OrigPos%3D"+tui.analytics.page.OrigPos);if(typeof tui.analytics.page.FinPos!=="undefined")pqryArray.push("FinPos%3D"+tui.analytics.page.FinPos);if(typeof tui.analytics.page.SubProd!=="undefined")pqryArray.push("SubProd%3D"+tui.analytics.page.SubProd);if(typeof tui.analytics.page.BudgetF!==
"undefined")pqryArray.push("BudgetF%3D"+tui.analytics.page.BudgetF);if(typeof tui.analytics.page.RatingF!=="undefined")pqryArray.push("RatingF%3D"+tui.analytics.page.RatingF);if(typeof tui.analytics.page.TARatingF!=="undefined")pqryArray.push("TARatingF%3D"+tui.analytics.page.TARatingF);if(typeof tui.analytics.page.HolTypeF!=="undefined")pqryArray.push("HolTypeF%3D"+tui.analytics.page.HolTypeF);if(typeof tui.analytics.page.BestForF!=="undefined")pqryArray.push("BestForF%3D"+tui.analytics.page.BestForF);
if(typeof tui.analytics.page.DepAirF!=="undefined")pqryArray.push("DepAirF%3D"+tui.analytics.page.DepAirF);if(typeof tui.analytics.page.OutTimeF!=="undefined")pqryArray.push("OutTimeF%3D"+tui.analytics.page.OutTimeF);if(typeof tui.analytics.page.BackTimeF!=="undefined")pqryArray.push("BackTimeF%3D"+tui.analytics.page.BackTimeF);if(typeof tui.analytics.page.FeaturesF!=="undefined")pqryArray.push("FeaturesF%3D"+tui.analytics.page.FeaturesF);if(typeof tui.analytics.page.GeoF!=="undefined")pqryArray.push("GeoF%3D"+
tui.analytics.page.GeoF);if(typeof tui.analytics.page.Board!=="undefined")pqryArray.push("Board%3D"+tui.analytics.page.Board);if(typeof tui.analytics.page.TourOpF!=="undefined")pqryArray.push("TourOpF%3D"+tui.analytics.page.TourOpF);if(typeof tui.analytics.page.PackageTypeF!=="undefined")pqryArray.push("PackageTypeF%3D"+tui.analytics.page.PackageTypeF);if(typeof tui.analytics.page.DreamF!=="undefined")pqryArray.push("DreamF%3D"+tui.analytics.page.DreamF);if(typeof tui.analytics.page.AccomTypeF!==
"undefined")pqryArray.push("AccomTypeF%3D"+tui.analytics.page.AccomTypeF);if(typeof tui.analytics.page.BoardF!=="undefined")pqryArray.push("BoardF%3D"+tui.analytics.page.BoardF);if(typeof tui.analytics.page.TuiAnc!=="undefined")pqryArray.push("TuiAnc%3D"+tui.analytics.page.TuiAnc);if(typeof tui.analytics.page.LimAvS!=="undefined")pqryArray.push("LimAvS%3D"+tui.analytics.page.LimAvS);if(typeof tui.analytics.page.pageUid!=="undefined")pqryArray.push("pageUid%3D"+tui.analytics.page.pageUid);if(typeof tui.analytics.page.ABTest_sp_abtest!==
"undefined")pqryArray.push("testName%3D"+tui.analytics.page.ABTest_sp_abtest.testName);if(typeof tui.analytics.page.ABTest_sp_abtest!=="undefined")pqryArray.push("variantCode%3D"+tui.analytics.page.ABTest_sp_abtest.variantCode);if(typeof tui.analytics.page.contextType!=="undefined")pqryArray.push("contextType%3D"+tui.analytics.page.contextType);if(typeof tui.analytics.page.CompClick!=="undefined")pqryArray.push("CompClick%3D"+tui.analytics.page.CompClick);if(typeof tui.analytics.page.abtest!=="undefined")pqryArray.push("abtest%3D"+
tui.analytics.page.abtest);if(typeof tui.analytics.page.AltFlt!=="undefined")pqryArray.push("AltFlt%3D"+tui.analytics.page.AltFlt);if(typeof tui.analytics.page.RmSlt!=="undefined")pqryArray.push("RmSlt%3D"+tui.analytics.page.RmSlt);if(typeof tui.analytics.page.LowDep!=="undefined")pqryArray.push("LowDep%3D"+tui.analytics.page.LowDep);if(typeof tui.analytics.page.MinPay!=="undefined")pqryArray.push("MinPay%3D"+tui.analytics.page.MinPay);if(typeof tui.analytics.page.Tracsref!=="undefined")pqryArray.push("Tracsref%3D"+
tui.analytics.page.Tracsref);if(typeof tui.analytics.page.PromoCode!=="undefined")pqryArray.push("PromoCode%3D"+tui.analytics.page.PromoCode);if(typeof tui.analytics.page.PromoValue!=="undefined")pqryArray.push("PromoValue%3D"+tui.analytics.page.PromoValue);if(typeof tui.analytics.page.Amount!=="undefined")pqryArray.push("Amount%3D"+tui.analytics.page.Amount);if(typeof tui.analytics.page.PayType!=="undefined")pqryArray.push("PayType%3D"+tui.analytics.page.PayType);if(typeof tui.analytics.page.Pax!==
"undefined")pqryArray.push("Pax%3D"+tui.analytics.page.Pax);if(typeof tui.analytics.page.FltInv!=="undefined")pqryArray.push("FltInv%3D"+tui.analytics.page.FltInv);if(typeof tui.analytics.page.carrier!=="undefined")pqryArray.push("carrier%3D"+tui.analytics.page.carrier);if(typeof tui.analytics.page.SrcBkgRef!=="undefined")pqryArray.push("SrcBkgRef%3D"+tui.analytics.page.SrcBkgRef);if(typeof tui.analytics.page.SrcBkgSys!=="undefined")pqryArray.push("SrcBkgSys%3D"+tui.analytics.page.SrcBkgSys);if(typeof tui.analytics.page.InboundDays!==
"undefined")pqryArray.push("InboundDays%3D"+tui.analytics.page.InboundDays);if(typeof tui.analytics.page.CheckIn!=="undefined")pqryArray.push("CheckIn%3D"+tui.analytics.page.CheckIn);if(typeof tui.analytics.page.ACSSRef!=="undefined")pqryArray.push("ACSSRef%3D"+tui.analytics.page.ACSSRef);if(typeof tui.analytics.page.Pers!=="undefined")pqryArray.push("Pers%3D"+tui.analytics.page.Pers);if(typeof tui.analytics.page.PerDisc!=="undefined")pqryArray.push("PerDisc%3D"+tui.analytics.page.PerDisc)}if(ck("enCompClick")){var elementClicked=
ck("enCompClick");pqryArray.push("compClick%3D"+elementClicked);document.cookie="enCompClick"+"\x3d;path\x3d/; expires\x3dThu, 01-Jan-70 00:00:01 GMT;"}if(Bootstrapper.Cookies.check("ServiceProvider"))pqryArray.push("ServiceProvider%3D"+Bootstrapper.Cookies.get("ServiceProvider"));window.pqry+=pqryArray.join("%26")},828018,152232);