const steps = Array.from(document.querySelectorAll('form .step'));
const form = document.querySelector('form');
const nextBtn = document.querySelectorAll('form .next-btn');
const prevBtn = document.querySelectorAll('form .prev-btn');

const laDate = new Date();


const arrayYears = [];
const arrayMonth = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];

toastr.options = {
	"closeButton": false, "debug": false, "newestOnTop": true, "progressBar": true, "positionClass": "toast-top-right", "preventDuplicates": false,
	"showDuration": "15", "hideDuration": "2000", "timeOut": "1150", "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear",
	"showMethod": "fadeIn","hideMethod": "fadeOut"
}

//Label PDF
const labelMoi = document.getElementById('labelMoi');
const labelOrganisme = document.getElementById('labelOrganisme');
const labelObjet = document.getElementById('labelObjet');
const labelCorps = document.getElementById('labelCorps');
const labelSignature = document.getElementById('labelSignature');



//1
const inputMonPrenom = document.getElementById('inputMonPrenom');
const inputMonNom = document.getElementById('inputMonNom');
const inputMonAdresse = document.getElementById('inputMonAdresse');
const inputMonCodePostal = document.getElementById('code');
const inputMaVille = document.getElementById('ville');
const inputMonNumero = document.getElementById('inputMonNumero');
const inputMonEmail = document.getElementById('inputMonEmail');

const inputEntrepriseRef = document.getElementById('inputEntrepriseRef');
const inputEntrepriseNom = document.getElementById('inputEntrepriseNom');
const inputEntrepriseAdresse = document.getElementById('inputEntrepriseAdresse');
const inputEntrepriseVille = document.getElementById('ville2');
const inputEntrepriseCodePostal = document.getElementById('code2');

const checkMoiHomme = document.getElementById('checkMoiHomme');
const checkMoiFemme = document.getElementById('checkMoiFemme');
const checkRefHomme = document.getElementById('checkRefHomme');
const checkRefFemme = document.getElementById('checkRefFemme');


//2
const checkSpontane = document.getElementById('checkSpontane');
const checkToutPoste = document.getElementById('checkToutPoste');
const checkDispoNow = document.getElementById('checkDispoNow');

const inputPosteConvoite = document.getElementById('inputPosteConvoite');

const choixContrat1 = document.getElementById('choixContrat1');

const debutJobJour = document.getElementById('debutJobJour');
const debutJobMois = document.getElementById('debutJobMois');
const debutJobAn = document.getElementById('debutJobAn');

const choixDureeFormationNb = document.getElementById('choixDureeFormationNb');
const choixDureeFormationMot = document.getElementById('choixDureeFormationMot');

const lblConvoite = document.getElementById('lblConvoite');
const lblApartir1 = document.getElementById('lblApartir1');
const lblJusquau1 = document.getElementById('lblJusquau1');


//3
const checkEnFormation = document.getElementById('checkEnFormation');
const checkAucuneExperience = document.getElementById('checkAucuneExperience');

const choixDiplome = document.getElementById('choixDiplome');
const choixContratOccupe = document.getElementById('choixContratOccupe');

const inputNomDiplome = document.getElementById('inputNomDiplome');
const inputNomEcole = document.getElementById('inputNomEcole');
const inputPosteOccupe = document.getElementById('inputPosteOccupe');
const inputChezEntreprise = document.getElementById('inputChezEntreprise');

const lblPosteOccupe = document.getElementById('lblPosteOccupe');
const lblContratOccupe = document.getElementById('lblContratOccupe');
const lblEntrepriseOccupe = document.getElementById('lblChezEntreprise');


//4
const checkQualitéMotivation = document.getElementById('checkQualitéMotivation');
const checkQualitéDynamique = document.getElementById('checkQualitéDynamique');
const checkQualitéPolyvalence = document.getElementById('checkQualitéPolyvalence');
const checkQualitéRigeur = document.getElementById('checkQualitéRigeur');
const checkQualitéSerieux = document.getElementById('checkQualitéSerieux');
const checkQualitéDétermination = document.getElementById('checkQualitéDétermination');
const checkQualitéRelationnel = document.getElementById('checkQualitéRelationnel');
const checkQualitéDiscipline = document.getElementById('checkQualitéDiscipline');
const checkQualitéAutonomnie = document.getElementById('checkQualitéAutonomnie');

const inputMaitrise1 = document.getElementById('inputMaitrise1');
const inputMaitrise2 = document.getElementById('inputMaitrise2');
const inputMaitrise3 = document.getElementById('inputMaitrise3');

const inputShowQly = document.getElementById('inputShowQly');


//5
const formulationJePostule = document.getElementById('formulationJePostule');
const formulationTouteFin = document.getElementById('formulationTouteFin');
const formulationCapable = document.getElementById('formulationCapable');
const formulationOpportunite = document.getElementById('formulationOpportunite');
const formulationAvantFin = document.getElementById('formulationAvantFin');

var qualité1 = "";
var qualité2 = "";
var qualité3 = "";


const packHomme = ["Motivé", "Dynamique", "Polyvalent", "Rigoureux", "Sérieux", "Déterminé",
  	"Sociable", "Discipliné", "À l'écoute", "Étudiant", "Dîplomé", "heureux"];

const packFemme = ["Motivée", "Dynamique", "Polyvalente", "Rigoureuse", "Sérieuse", "Déterminée",
  	"Sociable", "Disciplinée", "À l'écoute", "Étudiante", "Dîplomée", "heureuse"];

var packQuOnUtilise;


nextBtn.forEach(button=> {
	button.addEventListener('click', () =>{
		changeStep('next');
})})

prevBtn.forEach(button=> {
	button.addEventListener('click', () =>{
		changeStep('prev');
})})

reinitialize();


$('input').on('input',function(e){ refreshData();});
$("input").on('focus', function() {refreshData();});
$("input").on('blur', function() {refreshData();});
$("input[type='checkbox']").on('change',function(e){ refreshData();});
$("select").on('change',function(e){ refreshData();});


document.getElementById("downloadBtn").onclick = function(event) { 
	try { CreatePDFfromHTML(); toastr.success('Téléchargement de lettre_de_motivation.pdf...'); }
	catch{ toastr.warning('Erreur lors du téléchargement'); }
}

labelObjet.style.visibility = "hidden";
labelCorps.style.visibility = "hidden";
labelSignature.style.visibility = "hidden";


var specialElementHandlers = {'#editor': function (element, renderer) { return true;}};


for (var i = 0; i < 11; i++)
	arrayYears.push(laDate.getFullYear() + i); 

for(var i = 1; i < 32; i++)
	debutJobJour.options.add(new Option(i,  i - 1 ));
	
for(var i = 0; i < arrayMonth.length; i++)
	debutJobMois.options.add(new Option(arrayMonth[i], i)); 

for(var i = 0; i < arrayYears.length; i++)
	debutJobAn.options.add(new Option(arrayYears[i], i));

for(var i = 1; i < 12; i++)
	choixDureeFormationNb.options.add(new Option(i, i));



//////////////////////////////////////////////////
inputMonPrenom.value = "Jean";
inputMonNom.value = "Dupont";
inputMonAdresse.value = "6 rue des filles";
inputMonEmail.value = "ddkonate@wii.fr"
inputMonNumero.value = "0678954236";
inputMonCodePostal.value = "92140";
inputMaVille.value = "Clamart"

inputEntrepriseNom.value="SFR";
inputEntrepriseAdresse.value="45 rue fosh";
inputEntrepriseCodePostal.value="75014";
inputEntrepriseVille.value="Paris";

inputNomDiplome.value = "SNIR";
inputNomDiplome.value = "SNIR";

inputMaitrise1.value = "de eezet";
inputMaitrise2.value = "de eezet";
inputMaitrise3.value = "de eezet";
//////////////////////////////////////////////////////



function blackMod(mode){
	if (mode){
		$(".container2 label").css('color', 'white');
		$(".container2").css('background-color', '#242424');
	}
	else {
		$(".container2 label").css('color', 'black');
		$(".container2").css('background-color', 'white');
	}

}


function tractionSaisie(){

	let index = 0;
	const active = document.querySelector('form .step.active');
	index = steps.indexOf(active);

	correctApostropheLabels2(); whatGenres();
	gestionToutPoste(); whatAreQualities(); gestionNbQualities();


	//Formatage des input
	inputMonNumero.value = phoneFormat(inputMonNumero.value);
	inputMonEmail.value = lowerAll(inputMonEmail.value);
	inputPosteConvoite.value = inputPosteConvoite.value.toLowerCase();
	inputPosteOccupe.value = inputPosteOccupe.value.toLowerCase();


	if (inputMonCodePostal.value.length != 5)
		inputMaVille.value = '';

	if (inputEntrepriseCodePostal.value.length != 5)
		inputEntrepriseVille.value = '';


	if (inputEntrepriseRef.value == ""){
		checkRefHomme.setAttribute("disabled","");
		checkRefFemme.setAttribute("disabled","");
		checkRefHomme.checked = false;
		checkRefFemme.checked = false;}
	else {
		checkRefHomme.removeAttribute("disabled","");
		checkRefFemme.removeAttribute("disabled","");
	/*	if (!checkRefHomme.checked && !checkRefFemme.checked)
			checkRefHomme.checked = true;*/
	}

	if (inputMonNom.value == "" && inputMonPrenom.value == ""){
		checkMoiHomme.setAttribute("disabled","");
		checkMoiFemme.setAttribute("disabled","");
		checkMoiHomme.checked = false;
		checkMoiFemme.checked = false;}
	else {
		checkMoiHomme.removeAttribute("disabled","");
		checkMoiFemme.removeAttribute("disabled","");
		if (!checkMoiHomme.checked && !checkMoiFemme.checked)
			checkMoiHomme.checked = true;
	}


	//Formatage des checkbox
	if(checkAucuneExperience.checked){
		inputPosteOccupe.setAttribute("disabled","");
		choixContratOccupe.setAttribute("disabled","");
		inputChezEntreprise.setAttribute("disabled","");
		lblContratOccupe.style.opacity = "15%";
		lblEntrepriseOccupe.style.opacity = "15%";
		lblPosteOccupe.style.opacity = "15%";}
  	else {
		inputPosteOccupe.removeAttribute("disabled","");
		choixContratOccupe.removeAttribute("disabled","");
		inputChezEntreprise.removeAttribute("disabled","");
		lblContratOccupe.style.opacity = "100%";
		lblEntrepriseOccupe.style.opacity = "100%";
		lblPosteOccupe.style.opacity = "100%";
  	}

	if(checkEnFormation.checked)
		document.getElementById('choixDiplome').options[0].text = 'Formation en cours';
	else 
	    document.getElementById('choixDiplome').options[0].text = 'Dernier dîplome obtenu';	

    if (checkDispoNow.checked == true){
	    debutJobAn.setAttribute("disabled","");
	    debutJobMois.setAttribute("disabled","");
	    debutJobJour.setAttribute("disabled","");
	    lblApartir1.style.opacity = "15%";}
    else {
	    debutJobAn.removeAttribute("disabled","");
	    debutJobMois.removeAttribute("disabled","");
	    debutJobJour.removeAttribute("disabled","");
	    lblApartir1.style.opacity = "100%";
    }

    if (checkToutPoste.checked == true){
	    inputPosteConvoite.value = ""
	    inputPosteConvoite.setAttribute("disabled","");
	    lblConvoite.style.opacity = "15%";}
    else {
	    inputPosteConvoite.removeAttribute("disabled","");
	    lblConvoite.style.opacity = "100%";
    }


	//Formatage select
	if (choixDiplome.value == "Sans dîplome"){
		inputNomDiplome.setAttribute("disabled","");
		inputNomDiplome.value = "";
		checkEnFormation.setAttribute("disabled","");
		checkEnFormation.checked = false;}
	else {
		inputNomDiplome.removeAttribute("disabled","");
		checkEnFormation.removeAttribute("disabled","");
	}

	if (choixDureeFormationNb.value != "1"){
		choixDureeFormationMot.options[0].text = 'semaines';
		choixDureeFormationMot.options[0].value = 'semaines';
		choixDureeFormationMot.options[2].text = 'ans';
		choixDureeFormationMot.options[2].value = 'ans';}
	else {
		choixDureeFormationMot.options[0].text = 'semaine';
		choixDureeFormationMot.options[0].value = 'semaine';
		choixDureeFormationMot.options[2].text = 'an';
		choixDureeFormationMot.options[2].value = 'an';
  	}

	if (choixContrat1.value == "CDI"){
		choixDureeFormationNb.setAttribute("disabled","");
		choixDureeFormationMot.setAttribute("disabled","");	
		lblJusquau1.style.opacity = '15%';}
	else{
		choixDureeFormationNb.removeAttribute("disabled","");
		choixDureeFormationMot.removeAttribute("disabled","");
		lblJusquau1.style.opacity = '100%';
  	}


	//Gestion BlackMod
	blackMod(document.getElementById("switch").checked)


	//Gestion dernier bouton noir
	if (index == 4 && isFormComplete())
		document.getElementById("downloadBtn").removeAttribute("disabled","");
	else 
		document.getElementById("downloadBtn").setAttribute("disabled","");
		


	if (index == 2)
		labelObjet.style.visibility = "visible";
	if (index == 4){	
		labelCorps.style.visibility = "visible";
		labelSignature.style.visibility = "visible";}


	//Apercu
	labelMoi.innerHTML = inputMonPrenom.value + " " + inputMonNom.value + "<br>" +  
					     inputMonAdresse.value + "<br>" + 
					     inputMonCodePostal.value + " " + (inputMaVille.value).replace(" Arrondissement", "")  + "<br>" +  
					     inputMonEmail.value + "<br>" + 
					     inputMonNumero.value; 


	labelOrganisme.innerHTML =  isRefHere() +  
								inputEntrepriseNom.value + "<br>" + 
							    inputEntrepriseAdresse.value + "<br>" + 
							    inputEntrepriseCodePostal.value + " "+ 
							    (inputEntrepriseVille.value).replace(" Arrondissement", "") + "<br>" + "<br>" + 
							   
							   "<br>À " + (inputMaVille.value).replace(" Arrondissement", "")
							   + ", le " + laDate.getDate()+" "+(arrayMonth[laDate.getMonth()])+" "+laDate.getFullYear();


	labelObjet.innerHTML = "<br>Objet : Candidature " + isSpontaned();


	labelCorps.innerHTML = madameMonsieur() + "<br><br>" + 

						   isStudingNow() + "suis "+ itsForTruc() + "à la recherche d'un " + choixContrat1.value +  isDispoNow() + gestionToutPoste() + ". " 
	                       + '<span id="spanJePostule" onmouseover="setSpanUnderline(true, this);" onmouseleave="setSpanUnderline(false, this);">' + formulationJePostule.options[formulationJePostule.value].text  + '</span>' 

						   + whatDidILearn() + getQuality(1) + ", " + lowerAll(getQuality(2)) +" et " + lowerAll(getQuality(3)) + ',<span id="spanCapable" onmouseover="setSpanUnderline(true, this);" onmouseleave="setSpanUnderline(false, this);"> ' + formulationCapable.options[formulationCapable.value].text + '</span>' + " Je saurais également mettre mes compétences et mes qualités à profit de votre entreprise." 
						   
						   + "<br><br>L'idée d'évoluer dans une entreprise comme " + inputEntrepriseNom.value + " me motive au plus haut point. " + '<span id="spanOpportunite" onmouseover="setSpanUnderline(true, this);" onmouseleave="setSpanUnderline(false, this);" >' + formulationOpportunite.options[formulationOpportunite.value].text  + '</span>'
						   
						   + dontEntacheVolonté() + "<br><br>" + '<span id="spanAvantFin" onmouseover="setSpanUnderline(true, this);" onmouseleave="setSpanUnderline(false, this);">' 
						   
						   + formulationAvantFin.options[formulationAvantFin.value].text   + '</span>' + "<br><br>" + '<span id="spanTouteFin" onmouseover="setSpanUnderline(true, this);" onmouseleave="setSpanUnderline(false, this);">' 
						   
						   + formulationTouteFin.options[formulationTouteFin.value].text   + '</span>';
						   

	labelSignature.innerHTML = "<br>" + inputMonPrenom.value + " " + inputMonNom.value;
}
		

function dontEntacheVolonté (){
	if (checkAucuneExperience.checked == true)
		return " <br><br>Mon manque d’expérience professionnelle dans ce secteur n’entame en rien ma volonté à occuper ce poste et me pousse, au contraire, à faire mes preuves.";
	else
		return "";
}
		

function whatDidILearn (){

	if (checkAucuneExperience.checked == false && choixDiplome.value != "Sans dîplome" ){
		return "<br><br>J'ai, au cours de mes études, et de mon " + choixContratOccupe.value + " chez " + getInputChezEntreprise() +  ", en tant que " + getInputPosteOccupe() + ", eu l'occasion d'aquérir des compétences comme la maîtrise " 
			+ getMaitrise(1) + ", " + getMaitrise(2) + ", et " + getMaitrise(3) + ". " ;
	}


	else if (checkAucuneExperience.checked == false && choixDiplome.value == "Sans dîplome" ){

		return "<br><br>J'ai, au cours de mon " + choixContratOccupe.value + " chez " + getInputChezEntreprise() +  ", en tant que " + getInputPosteOccupe() + ", eu l'occasion d'aquérir des compétences comme la maîtrise " 
			+ getMaitrise(1) + ", " + getMaitrise(2) + ", et " + getMaitrise(3) + ". " ;
	}


	else if (checkAucuneExperience.checked == true && choixDiplome.value != "Sans dîplome" ){

	return "<br><br>J'ai, au cours de mes études, eu l'occasion d'acquérir des compétences comme la maîtrise " 
		+ getMaitrise(1) + ", " + getMaitrise(2) + ", et " + getMaitrise(3) + ". ";
	}


	else if (checkAucuneExperience.checked == true && choixDiplome.value == "Sans dîplome" ){

	return "<br><br>J'ai eu l'occasion d'aquérir des compétences comme la maîtrise " 
		+ getMaitrise(1) + ", " + getMaitrise(2) + ", et " + getMaitrise(3) + ". ";
	}
}




function changeStep (btn){

	let index = 0;
	const active = document.querySelector('form .step.active');
	index = steps.indexOf(active);


	if (btn === 'next' && index != 4) {


		var boolPrenomMoi = true; var boolNomMoi = true; var boolAdresseMoi = true; var boolCodePostalMoi = true; 
		var boolVilleMoi = true; var boolEmailMoi = true; var boolNumeroMoi = true;

		var boolNomEntreprise = true; var boolNomRef = true; var boolAdresseEntreprise = true; 
		var boolCodePostalEntreprise = true; var boolVilleEntreprise = true;

		var boolContrat1 = true;
		var boolDateCoerente = true;var boolPosteConvoite = true; 
		var boolDiplome = true; var boolNomDiplome = true;

		var boolPosteOccupe = true; 
		var boolContratOccupe = true;var boolEntrepriseOccupe = true; 

		var boolQualites = true; var boolMaitrises = true;


		if ((inputMonPrenom.value.length <=1) && index == 0){
			inputMonPrenom.style.borderColor = "#DC143C"; 
			boolPrenomMoi = false;}
		else {
			inputMonPrenom.style.borderColor = "#747474"; 
			boolPrenomMoi = true;}


		if ((inputMonNom.value.length <=1) && index == 0){
			inputMonNom.style.borderColor = "#DC143C";
			boolNomMoi = false;}
		else {
			inputMonNom.style.borderColor = "#747474";
			boolNomMoi = true;}


		if ((inputMonAdresse.value.length <=7 || !inputMonAdresse.value.includes(" ") || inputMonAdresse.value.includes("<br>") || inputMonAdresse.value.includes("/n") || (inputMonAdresse.value.charAt(0).match(/\d+/g) == null)) && index == 0){
			inputMonAdresse.style.borderColor = "#DC143C";
			boolAdresseMoi = false;}
		else{
			inputMonAdresse.style.borderColor = "#747474";
			boolAdresseMoi = true;}
		

		if ((inputMonCodePostal.value.length !=5) && index == 0){
			inputMonCodePostal.style.borderColor = "#DC143C";
			boolCodePostalMoi = false;}
		else {
			inputMonCodePostal.style.borderColor = "#747474";
			boolCodePostalMoi = true;}


		if ((inputMaVille.value.length == 0) && index == 0){
			inputMaVille.style.borderColor = "#DC143C";
			boolVilleMoi = false;}
		else {
			inputMaVille.style.borderColor = "#747474";
			boolVilleMoi = true;}


		if ((inputMonEmail.value.length <=9 || !inputMonEmail.value.includes("@") || inputMonEmail.value.includes("@.")|| inputMonEmail.value.includes("<br>") || inputMonEmail.value.includes("/n") || 
			(!inputMonEmail.value.endsWith(".com") && !inputMonEmail.value.endsWith(".fr") && !inputMonEmail.value.endsWith(".net"))) && index == 0){
			inputMonEmail.style.borderColor = "#DC143C";
			boolEmailMoi = false;}
		else{
			inputMonEmail.style.borderColor = "#747474";
			boolEmailMoi = true;}
		

		if ((inputMonNumero.value.length !=14 || (!inputMonNumero.value.startsWith("06") && !inputMonNumero.value.startsWith("07")&& !inputMonNumero.value.includes(" "))) &&
			(inputMonNumero.value.length !=10 || (!inputMonNumero.value.startsWith("06") && !inputMonNumero.value.startsWith("07"))) && index == 0){
			inputMonNumero.style.borderColor = "#DC143C";
			boolNumeroMoi = false;}
		else{
			 inputMonNumero.style.borderColor = "#747474";
			 boolNumeroMoi = true;}




		if ((inputEntrepriseNom.value.length <=1|| inputEntrepriseNom.value.includes("<br>") || inputEntrepriseNom.value.includes("/n") ) && index == 0){
			inputEntrepriseNom.style.borderColor = "#DC143C"; 
			boolNomEntreprise = false;}
		else {
			inputEntrepriseNom.style.borderColor = "#747474"; 
			boolNomEntreprise = true;}


		if (((inputEntrepriseRef.value.length != 0 && inputEntrepriseRef.value.length < 3) || (inputEntrepriseRef.value.includes("<br>") 
			|| inputEntrepriseRef.value.includes("/n"))) && index == 0){
			inputEntrepriseRef.style.borderColor = "#DC143C";
			boolNomRef = false;}
		else {
			inputEntrepriseRef.style.borderColor = "#747474";
			boolNomRef = true;}


		if ((inputEntrepriseAdresse.value.length <=7 || !inputEntrepriseAdresse.value.includes(" ") || inputEntrepriseAdresse.value.includes("<br>") || inputEntrepriseAdresse.value.includes("/n") || 
			(inputEntrepriseAdresse.value.charAt(0).match(/\d+/g) == null)) && index == 0){
			inputEntrepriseAdresse.style.borderColor = "#DC143C";
			boolAdresseEntreprise = false;}
		else{
			inputEntrepriseAdresse.style.borderColor = "#747474";
			boolAdresseEntreprise = true;}
		

		if ((inputEntrepriseCodePostal.value.length !=5) && index == 0){
			inputEntrepriseCodePostal.style.borderColor = "#DC143C";
			boolCodePostalEntreprise = false;}
		else {
			inputEntrepriseCodePostal.style.borderColor = "#747474";
			boolCodePostalEntreprise = true;}


		if ((inputEntrepriseVille.value.length == 0) && index == 0){
			inputEntrepriseVille.style.borderColor = "#DC143C";
			boolVilleEntreprise = false;}
		else {
			inputEntrepriseVille.style.borderColor = "#747474";
			boolVilleEntreprise = true;}



		if ((inputPosteConvoite.value <= 4 && checkToutPoste.checked == false|| inputPosteConvoite.value.includes("<br>") || inputPosteConvoite.value.includes("/n")) && index == 1){
			inputPosteConvoite.style.borderColor = "#DC143C"; 
			boolPosteConvoite = false;}
		else {
			inputPosteConvoite.style.borderColor = "#747474"; 
			boolPosteConvoite = true;}


		if ((choixContrat1.value == "___" ) && index == 1){
			choixContrat1.style.borderColor = "#DC143C"; 
			boolContrat1 = false;}
		else {
			choixContrat1.style.borderColor = "#747474"; 
			boolContrat1 = true;}



		if ((choixDiplome.value == "___") && index == 2){
			choixDiplome.style.borderColor = "#DC143C"; 
			boolDiplome = false;}
		else {
			choixDiplome.style.borderColor = "#747474"; 
			boolDiplome = true;}


		if ((inputNomDiplome.value.length == 0  && choixDiplome.value != "Sans dîplome"|| inputNomDiplome.value.includes("<br>") || inputNomDiplome.value.includes("/n")) && index == 2){
			inputNomDiplome.style.borderColor = "#DC143C"; 
			boolNomDiplome = false;}
		else {
			inputNomDiplome.style.borderColor = "#747474"; 
			boolNomDiplome = true;}



		if ((inputPosteOccupe.value.length <= 4 && checkAucuneExperience.checked == false || inputPosteOccupe.value.includes("<br>") || inputPosteOccupe.value.includes("/n")) && index == 2){
			inputPosteOccupe.style.borderColor = "#DC143C"; 
			boolPosteOccupe = false;}
		else {
			inputPosteOccupe.style.borderColor = "#747474"; 
			boolPosteOccupe = true;}


		if ((choixContratOccupe.value == "___" && checkAucuneExperience.checked == false ) && index == 2){
			choixContratOccupe.style.borderColor = "#DC143C"; 
			boolContratOccupe = false;}
		else {
			choixContratOccupe.style.borderColor = "#747474"; 
			boolContratOccupe = true;}


		if ((inputChezEntreprise.value.length <= 2  && checkAucuneExperience.checked == false || inputChezEntreprise.value.includes("<br>") || inputChezEntreprise.value.includes("/n")) && index == 2){
			inputChezEntreprise.style.borderColor = "#DC143C"; 
			boolEntrepriseOccupe = false;}
		else {
			inputChezEntreprise.style.borderColor = "#747474"; 
			boolEntrepriseOccupe = true;}



		if ((inputShowQly.value != "3 / 3") && index == 3){
			inputShowQly.style.borderColor = "#DC143C";
			boolQualites = false;}
		else {
			inputShowQly.style.borderColor = "#747474";
			boolQualites = true;}



		if ((inputMaitrise1.value.length < 4 || (!inputMaitrise1.value.startsWith("du") && !inputMaitrise1.value.startsWith("de") && !inputMaitrise1.value.startsWith("des")) || inputMaitrise1.value.includes("<br>") || inputMaitrise1.value.includes("/n")) && index == 3){
			inputMaitrise1.style.borderColor = "#DC143C";}
		else {
			inputMaitrise1.style.borderColor = "#747474";}

		if ((inputMaitrise2.value.length < 4 || (!inputMaitrise2.value.startsWith("du") && !inputMaitrise2.value.startsWith("de") && !inputMaitrise2.value.startsWith("des")) || inputMaitrise2.value.includes("<br>") || inputMaitrise2.value.includes("/n")) && index == 3){
			inputMaitrise2.style.borderColor = "#DC143C";}
		else {
			inputMaitrise2.style.borderColor = "#747474";}

		if ((inputMaitrise3.value.length < 4 || (!inputMaitrise3.value.startsWith("du") && !inputMaitrise3.value.startsWith("de") && !inputMaitrise3.value.startsWith("des")) || inputMaitrise3.value.includes("<br>") || inputMaitrise3.value.includes("/n")) && index == 3){
			inputMaitrise3.style.borderColor = "#DC143C";}
		else {
			inputMaitrise3.style.borderColor = "#747474";}



		if ((inputMaitrise1.value.length < 4 
			|| (!inputMaitrise1.value.startsWith("du") && !inputMaitrise1.value.startsWith("de") && !inputMaitrise1.value.startsWith("des")) 
			|| inputMaitrise1.value.includes("<br>") || inputMaitrise1.value.includes("/n")) ||

			(inputMaitrise2.value.length < 4 
			|| (!inputMaitrise2.value.startsWith("du") && !inputMaitrise2.value.startsWith("de") && !inputMaitrise2.value.startsWith("des")) 
			|| inputMaitrise2.value.includes("<br>") || inputMaitrise2.value.includes("/n")) ||

			(inputMaitrise3.value.length < 4 
			|| (!inputMaitrise3.value.startsWith("du") && !inputMaitrise3.value.startsWith("de") && !inputMaitrise3.value.startsWith("des")) 
			|| inputMaitrise3.value.includes("<br>") || inputMaitrise3.value.includes("/n"))

			&& index == 3){

			boolMaitrises = false;}
		else {
			boolMaitrises = true;}



		if ((boolPrenomMoi && boolNomMoi && boolAdresseMoi && boolCodePostalMoi && boolVilleMoi && boolEmailMoi && boolNumeroMoi 
			&& boolNomEntreprise && boolNomRef && boolAdresseEntreprise && boolCodePostalEntreprise &&  boolVilleEntreprise && index == 0) ||

			(boolPosteConvoite && boolContrat1 && index == 1) ||

			(boolDiplome && boolNomDiplome && boolContratOccupe && boolEntrepriseOccupe && boolPosteOccupe && index == 2) ||
  
			(boolQualites && boolMaitrises && index == 3)){

			document.getElementById("leform").style.animation = "fadeout 0.2s forwards";

			setTimeout(function(){  

				document.getElementById("leform").style.animation = "fadein 0.2s forwards";
				steps[index].classList.remove('active');
				index ++; steps[index].classList.add('active');
				refreshData();
			}, 300);
		}

		}


		else if(btn === 'prev'){ 

		document.getElementById("leform").style.animation = "fadeout 0.2s forwards";

			setTimeout(function(){  
				document.getElementById("leform").style.animation = "fadein 0.2s forwards";
				steps[index].classList.remove('active');
				index --; steps[index].classList.add('active');

				refreshData();
			}, 300);
		}
}




function upperOnlyFist (myString){

	var retour1 = myString.trim();
	var retour2 = retour1.charAt(0).toUpperCase() + retour1.slice(1);
	return retour2;
}

function lowerOnlyFist (myString){

	var retour1 = myString.trim();
	var retour2 = retour1.charAt(0).toLowerCase() + retour1.slice(1);
	return retour2;
}

function lowerAll (myString){

	var retour1 = myString.trim();
	var retour2 = retour1.toLowerCase();
	return retour2;
}

function setOnGoodFormat(myString){

	var retour1 = upperEachWordBetwinSpaces(myString);
	var retour2 = upperEachWordBetwinTirets(retour1);
	var retour3 = upperEachWordBetwinApostrophe(retour2);
	
	return retour3;
}

function upperEachWordBetwinSpaces(myString){

	var retour1 = myString.trim();
	var splitStr = retour1.toLowerCase().split(' ');
	for (var i = 0; i < splitStr.length; i++){

	if (checkIfJointure(splitStr[i])){
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);}
	}
	return splitStr.join(' ');
}

function upperEachWordBetwinSpaces2(myString){

	var retour1 = myString.trim();
	var splitStr = retour1.toLowerCase().split(' ');
	for (var i = 0; i < splitStr.length; i++){

		if (true){
			splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);}
		}
	return splitStr.join(' ');
}


function upperEachWordBetwinTirets(myString){

	var retour1 = myString.trim();
	var splitStr2 = retour1.split('-');
	for (var i = 0; i < splitStr2.length; i++){
		splitStr2[i] = splitStr2[i].charAt(0).toUpperCase() + splitStr2[i].substring(1);
		}
		return splitStr2.join('-');
}


function upperEachWordBetwinApostrophe(myString){

		var retour1 = myString.trim();

	if (retour1.includes("L'") || retour1.includes("l'")){

		retour1 = retour1.replace("L'", "l' ");
		retour1 =upperEachWordBetwinSpaces(retour1);
		retour1 = retour1.replace("L' ", "l'");
	}


if (retour1.includes("D'") || retour1.includes("d'")){

		retour1 = retour1.replace("D'", "d' ");
		retour1 =upperEachWordBetwinSpaces(retour1);
		retour1 = retour1.replace("D' ", "d'");
	}
	return retour1;
}

function checkIfJointure(splitStr){

	if (splitStr != "de" && splitStr != "du" && splitStr != "des" &&
		splitStr != "le" && splitStr != "la" && splitStr != "les" && splitStr != "bis" 
		&& splitStr != "ter" && splitStr != "quater") {
		return true;
	}
	else 
		return false;
	
}



function phoneFormat(value) {

    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{2,16}/g);
    var match = matches && matches[0] || ''
    var parts = []

    for (i=0, len=match.length; i<len; i+=2) 
        parts.push(match.substring(i, i+2))

    if (parts.length) 
        return parts.join(' ')
    else 
        return value
}



function isNumberKey(evt){

    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}



function choixDuGenreH(){
	checkMoiFemme.checked = false;
	if (!checkMoiHomme.checked){
		checkMoiHomme.checked = true;}

	tractionSaisie();
}

function choixDuGenreF(){
	checkMoiHomme.checked = false;
	if (!checkMoiFemme.checked){
		checkMoiFemme.checked = true;}

	tractionSaisie();
}


function choixDuGenreH2(){
	checkRefFemme.checked = false;
	tractionSaisie();
}

function choixDuGenreF2(){
	checkRefHomme.checked = false;
	tractionSaisie();
}


function refreshData(){

	inputMonPrenom.value = setOnGoodFormat (inputMonPrenom.value);
	inputMonNom.value = setOnGoodFormat (inputMonNom.value);
	inputMonAdresse.value = setOnGoodFormat (inputMonAdresse.value);
	inputMonEmail.value = lowerAll(inputMonEmail.value.trim());

	inputEntrepriseRef.value = setOnGoodFormat (inputEntrepriseRef.value);
	inputEntrepriseNom.value = upperOnlyFist(inputEntrepriseNom.value.trim());
	inputEntrepriseAdresse.value = setOnGoodFormat (inputEntrepriseAdresse.value);

	inputPosteConvoite.value = lowerOnlyFist(inputPosteConvoite.value.trim());

	inputNomDiplome.value = inputNomDiplome.value.trim();

	inputPosteOccupe.value = lowerOnlyFist(inputPosteOccupe.value.trim());

	inputChezEntreprise.value = upperOnlyFist(inputChezEntreprise.value.trim());

	inputMaitrise1.value = inputMaitrise1.value.trim();
	inputMaitrise2.value = inputMaitrise2.value.trim();
	inputMaitrise3.value = inputMaitrise3.value.trim();

	tractionSaisie();
}




function madameMonsieur(){

	if (inputEntrepriseRef.value == "") 
		return "<br>Madame, Monsieur,";
	else if (checkRefHomme.checked == true && inputEntrepriseRef.value != "")
		return "<br>Monsieur " + inputEntrepriseRef.value + ",";
	else if (checkRefFemme.checked == true && inputEntrepriseRef.value != "")
		return "<br>Madame " + inputEntrepriseRef.value + ",";
}



function isRefHere(){

	if (inputEntrepriseRef.value == "") 
		return "";
	else 
		var utils = "";

		if (checkRefHomme.checked == true)
			utils = "M. ";
		if (checkRefFemme.checked == true)
			utils = "Mme ";

		return utils + inputEntrepriseRef.value + "<br>";	
}

function reinitialize (){

	var x = document.querySelectorAll('input[type="text"]');
		for(i = 0; i < x.length; i++) {
	    	x[i].value = "";
		}

	var x = document.querySelectorAll('input[type="tel"]');
		for(i = 0; i < x.length; i++) {
	    	x[i].value = "";
		}

	var x = document.querySelectorAll('input[type="checkbox"]');
		for(i = 0; i < x.length; i++) {
	    	if (x[i].id != "switch") {x[i].checked = false;	}	
		}

	var x = document.getElementsByTagName("select");
		for(var i = 0; i < x.length; i++) {
			x[i].selectedIndex = 0; console.log(x[i]);
		} 
}


function goTo(indexX){
	let index = 0;
	const active = document.querySelector('form .step.active');
	index = steps.indexOf(active);

	steps[index].classList.remove('active');
	index = indexX; steps[index].classList.add('active');

	refreshData();
}


function checkNbQualites (){

	var comptageQualités = 0;

	if (checkQualitéMotivation.checked == true)
		comptageQualités++;
	if (checkQualitéDynamique.checked == true)
		comptageQualités++;
	if (checkQualitéPolyvalence.checked == true)
		comptageQualités++;
	if (checkQualitéRigeur.checked == true)
		comptageQualités++;
	if (checkQualitéSerieux.checked == true)
		comptageQualités++;
	if (checkQualitéDétermination.checked == true)
		comptageQualités++;
	if (checkQualitéRelationnel.checked == true)
		comptageQualités++;
	if (checkQualitéDiscipline.checked == true)
		comptageQualités++;
	if (checkQualitéAutonomnie.checked == true)
		comptageQualités++;

	return comptageQualités;

}

function correctApostropheLabels(){

	if (inputPosteConvoite.value.charAt(0) == "a" || inputPosteConvoite.value.charAt(0) == "à" || 
		inputPosteConvoite.value.charAt(0) == "e" || inputPosteConvoite.value.charAt(0) == "é" || inputPosteConvoite.value.charAt(0) == "è" ||
		inputPosteConvoite.value.charAt(0) == "i" || inputPosteConvoite.value.charAt(0) == "î" || inputPosteConvoite.value.charAt(0) == "ï" ||
		inputPosteConvoite.value.charAt(0) == "o" || inputPosteConvoite.value.charAt(0) == "ô" || inputPosteConvoite.value.charAt(0) == "ö" ||
		inputPosteConvoite.value.charAt(0) == "u" || inputPosteConvoite.value.charAt(0) == "ù"|| inputPosteConvoite.value.charAt(0) == "œ"||
		inputPosteConvoite.value.charAt(0) == "y"){
		
		lblConvoite.innerHTML = "Vous convoitez le poste d'";
		return "d'";
	}

	else{
		lblConvoite.innerHTML = "Vous convoitez le poste de";
		return  "de ";}
	}


function correctApostropheLabels2(){
	
	if (inputPosteOccupe.value.charAt(0) == "a" || inputPosteOccupe.value.charAt(0) == "à" || 
		inputPosteOccupe.value.charAt(0) == "e" || inputPosteOccupe.value.charAt(0) == "é" || inputPosteOccupe.value.charAt(0) == "è" ||
		inputPosteOccupe.value.charAt(0) == "i" || inputPosteOccupe.value.charAt(0) == "î" || inputPosteOccupe.value.charAt(0) == "ï" ||
		inputPosteOccupe.value.charAt(0) == "o" || inputPosteOccupe.value.charAt(0) == "ô" || inputPosteOccupe.value.charAt(0) == "ö" ||
		inputPosteOccupe.value.charAt(0) == "u" || inputPosteOccupe.value.charAt(0) == "ù"|| inputPosteOccupe.value.charAt(0) == "œ"||
		inputPosteOccupe.value.charAt(0) == "y"){

		lblPosteOccupe.innerHTML = "Vous occupiez le poste d'";
	}

	else
		lblPosteOccupe.innerHTML = "Vous occupiez le poste de";
}


function gestionNbQualities(){

	checkQualitéAutonomnie.addEventListener('change', (event) => {
		if(checkNbQualites() >= 4 && checkQualitéAutonomnie.checked == true){
			checkQualitéAutonomnie.checked = false;}
			inputShowQly.value = checkNbQualites() + " / 3"})

	checkQualitéMotivation.addEventListener('change', (event) => {
		if(checkNbQualites() >= 4 && checkQualitéMotivation.checked == true){
			checkQualitéMotivation.checked = false;}
			inputShowQly.value = checkNbQualites() + " / 3"})

	checkQualitéDiscipline.addEventListener('change', (event) => {
		if(checkNbQualites() >= 4 && checkQualitéDiscipline.checked == true){
			checkQualitéDiscipline.checked = false;}
			inputShowQly.value = checkNbQualites() + " / 3"})


	checkQualitéRelationnel.addEventListener('change', (event) => {
		if(checkNbQualites() >= 4 && checkQualitéRelationnel.checked == true){
			checkQualitéRelationnel.checked = false;}
			inputShowQly.value = checkNbQualites() + " / 3"})


	checkQualitéRigeur.addEventListener('change', (event) => {
		if(checkNbQualites() >= 4 && checkQualitéRigeur.checked == true){
			checkQualitéRigeur.checked = false;}	
			inputShowQly.value = checkNbQualites() + " / 3"})


	checkQualitéSerieux.addEventListener('change', (event) => {
		if(checkNbQualites() >= 4 && checkQualitéSerieux.checked == true){
			checkQualitéSerieux.checked = false;}
			inputShowQly.value = checkNbQualites() + " / 3"})


	checkQualitéPolyvalence.addEventListener('change', (event) => {
		if(checkNbQualites() >= 4 && checkQualitéPolyvalence.checked == true){
			checkQualitéPolyvalence.checked = false;}
			inputShowQly.value = checkNbQualites() + " / 3"})

	checkQualitéDétermination.addEventListener('change', (event) => {
		if(checkNbQualites() >= 4 && checkQualitéDétermination.checked == true){
			checkQualitéDétermination.checked = false;}
			inputShowQly.value = checkNbQualites() + " / 3"})


	checkQualitéDynamique.addEventListener('change', (event) => {
		if(checkNbQualites() >= 4 && checkQualitéDynamique.checked == true){
			checkQualitéDynamique.checked = false;}
			inputShowQly.value = checkNbQualites() + " / 3"})
}


document.getElementById("switch").checked = true;

	

function whatAreQualities(arraySloat){

	qualité1 = "";
	qualité2 = "";
	qualité3 = "";


	var boulDynamique = true;
	var boulRigoureux = true;
	var boulMotivé = true;
	var boulSocial = true;
	var boulPolyvalent = true;
	var boulSérieux = true;
	var boulAutonome = true;
	var boulDiscipliné = true;
	var boulDetermine = true;



	if (checkQualitéDynamique.checked == true && qualité1 == ""){
		qualité1 = packQuOnUtilise[1];
		boulDynamique = false;
	}
	else if (checkQualitéMotivation.checked == true && qualité1 == ""){
		qualité1 = packQuOnUtilise[0];
		boulMotivé = false;
	}
	else if (checkQualitéAutonomnie.checked == true && qualité1 == ""){
		qualité1 = packQuOnUtilise[8];
		boulAutonome = false;
	}
	else if (checkQualitéRelationnel.checked == true && qualité1 == ""){
		qualité1 = packQuOnUtilise[6];
		boulSocial = false;
	}
	else if (checkQualitéDétermination.checked == true && qualité1 == ""){
		qualité1 = packQuOnUtilise[4];
		boulDetermine = false;
	}
	else if (checkQualitéPolyvalence.checked == true && qualité1 == ""){
		qualité1 = packQuOnUtilise[2];
		boulPolyvalent = false;
	}
	else if (checkQualitéSerieux.checked == true && qualité1 == ""){
		qualité1 = packQuOnUtilise[5];
		boulSérieux = false;
	}
	else if (checkQualitéDiscipline.checked == true && qualité1 == ""){
		qualité1 = packQuOnUtilise[7];
		boulDiscipliné = false;
	}
	else if (checkQualitéRigeur.checked == true && qualité1 == ""){
		qualité1 = packQuOnUtilise[3];
		boulRigoureux = false;
	}


	if (checkQualitéDynamique.checked == true && qualité2 == "" && boulDynamique){
		qualité2 = packQuOnUtilise[1];
		boulDynamique = false;
	}
	else if (checkQualitéMotivation.checked == true && qualité2 == "" && boulMotivé){
		qualité2 = packQuOnUtilise[0];
		boulMotivé = false;
	}
	else if (checkQualitéAutonomnie.checked == true && qualité2 == "" && boulAutonome){
		qualité2 = packQuOnUtilise[8];
		boulAutonome = false;
	}
	else if (checkQualitéRelationnel.checked == true && qualité2 == "" && boulSocial){
		qualité2 = packQuOnUtilise[6];
		boulSocial = false;
	}
	else if (checkQualitéDétermination.checked == true && qualité2 == "" && boulDetermine){
		qualité2 = packQuOnUtilise[4];
		boulDetermine = false;
	}
	else if (checkQualitéPolyvalence.checked == true && qualité2 == "" && boulPolyvalent){
		qualité2 = packQuOnUtilise[2];
		boulPolyvalent = false;
	}
	else if (checkQualitéSerieux.checked == true && qualité2 == "" && boulSérieux){
		qualité2 = packQuOnUtilise[5];
		boulSérieux = false;
	}
	else if (checkQualitéDiscipline.checked == true && qualité2 == "" && boulDiscipliné){
		qualité2 = packQuOnUtilise[7];
		boulDiscipliné = false;
	}
	else if (checkQualitéRigeur.checked == true && qualité2 == "" && boulRigoureux){
		qualité2 = packQuOnUtilise[3];
		boulRigoureux = false;
	}


	if (checkQualitéDynamique.checked == true && qualité3 == "" && boulDynamique){
		qualité3 = packQuOnUtilise[1];
		boulDynamique = false;
	}
	else if (checkQualitéMotivation.checked == true && qualité3 == "" && boulMotivé){
		qualité3 = packQuOnUtilise[0];
		boulMotivé = false;
	}
	else if (checkQualitéAutonomnie.checked == true && qualité3 == "" && boulAutonome){
		qualité3 = packQuOnUtilise[8];
		boulAutonome = false;
	}
	else if (checkQualitéRelationnel.checked == true && qualité3 == "" && boulSocial){
		qualité3 = packQuOnUtilise[6];
		boulSocial = false;
	}
	else if (checkQualitéDétermination.checked == true && qualité3 == "" && boulDetermine){
		qualité3 = packQuOnUtilise[4];
		boulDetermine = false;
	}
	else if (checkQualitéPolyvalence.checked == true && qualité3 == "" && boulPolyvalent){
		qualité3 = packQuOnUtilise[2];
		boulPolyvalent = false;
	}
	else if (checkQualitéSerieux.checked == true && qualité3 == "" && boulSérieux){
		qualité3 = packQuOnUtilise[5];
		boulSérieux = false;
	}
	else if (checkQualitéDiscipline.checked == true && qualité3 == "" && boulDiscipliné){
		qualité3 = packQuOnUtilise[7];
		boulDiscipliné = false;
	}
	else if (checkQualitéRigeur.checked == true && qualité3 == "" && boulRigoureux){
		qualité3 = packQuOnUtilise[3];
		boulRigoureux = false;
	}


	var hasard = [qualité1, qualité2, qualité3];
	shuffle(hasard);
	qualité1 = hasard[0]; qualité2= hasard[1]; qualité3= hasard[2];

	}



function shuffle(array) {
    var currentIndex = array.length,  randomIndex;

    while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}


function isSpontaned(){

	if (checkSpontane.checked == true && checkToutPoste.checked == false){
		return "pour un poste "+ correctApostropheLabels() + getPosteConvoite() + " en " + choixContrat1.value;
	}
	else if (checkSpontane.checked == false && checkToutPoste.checked == false){
		return "pour le poste "+ correctApostropheLabels() + getPosteConvoite() + " en " + choixContrat1.value;
	}
	else if (checkToutPoste.checked == true){
		return "pour un " + choixContrat1.value + "" ;
	}
}


function gestionToutPoste(){

	if (checkToutPoste.checked == true)
		return "";
	else
		if (checkSpontane.checked == true)
			return ", pour un poste "+ correctApostropheLabels() + getPosteConvoite();
		else
			return ", pour le poste "+ correctApostropheLabels() + getPosteConvoite();
}


function isDispoNow(){

	var phraseDurée = " de " + choixDureeFormationNb.value + " " + choixDureeFormationMot.value;
	var phraseDebut = ", à partir du " + debutJobJour.options[debutJobJour.value].text  +" "+ debutJobMois.options[debutJobMois.value].text +" "+ debutJobAn.options[debutJobAn.value].text;

	if (checkDispoNow.checked == true && choixContrat1.value != "CDI")
		return phraseDurée;

	else if (checkDispoNow.checked == true && choixContrat1.value == "CDI")
		return "";

	else if (checkDispoNow.checked == false && choixContrat1.value == "CDI"){
	 	return phraseDebut;
	}

	else if (checkDispoNow.checked == false && choixContrat1.value != "CDI"){
		return phraseDurée +  phraseDebut;
	}
}


function isStudingNow(){

	var tkt;

	if(choixDiplome.value == "licence")
		tkt = "une ";
	else
		tkt = "un ";


	if (checkEnFormation.checked == true && choixDiplome.value != "Sans dîplome")
		return "Actuellement " + lowerAll(packQuOnUtilise[9]) + " en " + choixDiplome.value + " "+ inputNomDiplome.value + ", je ";

	else if (checkEnFormation.checked == false && choixDiplome.value != "Sans dîplome")
		return packQuOnUtilise[10] +" d'" + tkt + choixDiplome.value + " "+ inputNomDiplome.value + ", je ";

	else if (choixDiplome.value == "Sans dîplome")
		return "Je ";
}


function itsForTruc(){
	if (checkEnFormation.checked == true){return ""}
	else {return "actuellement ";}
}




function getQuality(number){
	
	if (number == 1)
		if (qualité1 == "")
			return "___";
		else
			return qualité1;


	if (number == 2)
		if (qualité2 == "")
			return "___";
		else
			return qualité2;


	if (number == 3)
		if (qualité3 == "")
			return "___";
		else
			return qualité3;


	if (number == 4)
		if (qualité4 == "")
			return "___";
		else
			return qualité4;
}

function getMaitrise(number){
	
	if (number == 1)
		if (inputMaitrise1.value == "")
			return "___";
		else
			return inputMaitrise1.value;


	if (number == 2)
		if (inputMaitrise2.value == "")
			return "___";
		else
			return inputMaitrise2.value;


	if (number == 3)
		if (inputMaitrise3.value == "")
			return "___";
		else
			return inputMaitrise3.value;
}

function getPosteConvoite(){
	
	if (inputPosteConvoite.value == "")
		return "___";
	else
		return inputPosteConvoite.value;
}

function getInputChezEntreprise(){

	if (inputChezEntreprise.value == "")
		return "___";
	else
		return inputChezEntreprise.value;
}

function getInputPosteOccupe(){

	if (inputPosteOccupe.value == "")
		return "___";
	else
		return inputPosteOccupe.value;
}



function whatGenres (){

//GenreMoi
	if (checkMoiHomme.checked == true)
		packQuOnUtilise = packHomme
	else
		packQuOnUtilise = packFemme

	document.getElementById("spanMotive").innerHTML = packQuOnUtilise[0];
	document.getElementById("spanDynamique").innerHTML = packQuOnUtilise[1];
	document.getElementById("spanPolyvalent").innerHTML = packQuOnUtilise[2];
	document.getElementById("spanRigoureux").innerHTML = packQuOnUtilise[3];
	document.getElementById("spanDéterminé").innerHTML = packQuOnUtilise[4];
	document.getElementById("spanSérieux").innerHTML = packQuOnUtilise[5];
	document.getElementById("spanSocial").innerHTML = packQuOnUtilise[6];
	document.getElementById("spanDiscipliné").innerHTML = packQuOnUtilise[7];
	document.getElementById("spanAutonome").innerHTML = packQuOnUtilise[8];


//GenreRef
	var leGenreRef;

	if (checkRefHomme.checked == true){leGenreRef = "Monsieur"}
	else if (checkRefFemme.checked == true){leGenreRef = "Madame"}
	else {leGenreRef = "Madame, Monsieur"}

	formulationTouteFin.options[1].text = "Veuillez agréer, " + leGenreRef +", l'expression de mes sincères salutations.";
	formulationTouteFin.options[2].text = "Je vous prie de croire, " + leGenreRef +", à ma considération distinguée.";
	formulationTouteFin.options[3].text = "Dans l’attente d’une réponse que j’espère favorable, je vous prie de recevoir, " 
	+ leGenreRef +", mes salutations distinguées.";

	formulationAvantFin.options[2].text = "Je serais très " + packQuOnUtilise[11] + " de vous rencontrer prochainement pour envisager une future coopération.";
}



function diseappear(){

	document.getElementById("letsgo").style.animation = "fadeout 0.5s forwards";
	document.getElementById("mainImg").style.animation = "fadeout 0.5s forwards";
	document.getElementById("copyright").style.animation = "fadeout 0.5s forwards";

  	setTimeout(function() {
		document.getElementById("letsgo").style.display='none';
		document.getElementById("mainImg").style.display='none';	
		document.getElementById("container").style.animation = "fenetre 0.3s forwards";
		document.getElementById("container2").style.animation = "agrandit 0.3s forwards";
	}, 500);

	setTimeout(function() {
		document.getElementById("container2").style.display='block';
		document.getElementById("divSwitch").style.display='block';
		document.getElementById("leform").style.animation = "fadein 0.6s forwards";
		
	}, 500);
}


function reappear(){

	document.getElementById("divSwitch").style.display='none';	
	document.getElementById("leform").style.animation = "fadeout 0.4s forwards";
	document.getElementById("container2").style.animation = "raptissi 0.4s forwards";
	document.getElementById("container").style.animation = "raptissi 0.6s forwards";

	setTimeout(function() {

		document.getElementById("letsgo").style.display='block';
		document.getElementById("mainImg").style.display='initial';
		document.getElementById("letsgo").style.animation = "fadein 0.5s forwards";
		document.getElementById("mainImg").style.animation = "fadein 0.5s forwards";
	}, 500);
}



function extractSentence(str) {
    var part = str.substring( str.lastIndexOf("<span"), str.lastIndexOf('">') + 2);
    return part;
}


function CreatePDFfromHTML() {

	var doc = new jsPDF('p', 'pt', 'a4');
	doc.setFontSize(14);

	//Set Sauts de Lignes
	var moiRendu = labelMoi.innerHTML.replaceAll("<br>","\n");
	var orgaRendu = labelOrganisme.innerHTML.replaceAll("<br>","\n");
	var objetRendu = labelObjet.innerHTML.replaceAll("<br>","\n");
	var corpsRendu = labelCorps.innerHTML.replaceAll("<br>","\n");
	var signaRendu = labelSignature.innerHTML.replaceAll("<br>","\n");

	var phantom = "";
	var varLine = "";

	if (doc.splitTextToSize(orgaRendu, 540).length == 6){
		phantom = "\n\n\n\n\n\n";
		varLine = 212;
	}
	else if (doc.splitTextToSize(orgaRendu, 540).length == 7){
		phantom = "\n\n\n\n\n\n\n";
		varLine = 227.7;
	}

	var tout = moiRendu + phantom + "\n\n" + objetRendu + "\n" + corpsRendu + "\n\n\n" + signaRendu;

	for (var i = 0; i < 5; i++){
		tout = tout.replaceAll(extractSentence(tout),'');
		if (!tout.includes('<span')){ i = 10}
	}

	tout = tout.replaceAll('</span>','').replaceAll("<br>","\n");
	tout = doc.splitTextToSize(tout, 540);
	tout[tout.length - 1] = getAlignRight(tout[tout.length - 1]);

	//Set Affichage
	var marginTop = 40;
	var marginLeft = 35;
	
	doc.text(tout, marginLeft, marginTop, {align: 'left'});
	doc.textEx(orgaRendu, 550, 109, 'right', 'right');
	doc.line(marginLeft, marginTop + varLine,  Math.round(doc.getTextWidth(objetRendu)) + marginLeft, marginTop + varLine);

	setTimeout(function () { doc.save('lettre_de_motivation.pdf');}, 1500);
}




function getAlignRight(str){

	const lineNb = 120;
	var strLenght = str.length;

	var retour = "";

	for (var i = 1; i < lineNb - strLenght; i++){
		retour = retour  + " ";
	}
	return retour + str;

}


function isFormComplete(){

	let index = 0;
	const active = document.querySelector('form .step.active');
	index = steps.indexOf(active);

	var boolForm1 = true; var boolForm2 = true; var boolForm3 = true; var boolForm4 = true; var boolForm5 = true;

	if (formulationOpportunite.value == "0"){
		boolForm1 = false;}
	else {
		boolForm1 = true;}

	if (formulationCapable.value == "0"){
		boolForm2 = false;}
	else {
		boolForm2 = true;}

	if (formulationJePostule.value == "0"){
		boolForm3 = false;}
	else {
		boolForm3 = true;}

	if (formulationAvantFin.value == "0"){
		boolForm4 = false;}
	else {
		boolForm4 = true;}

	if (formulationTouteFin.value == "0"){
		boolForm5 = false;}
	else {
		boolForm5 = true;}

	if (boolForm1 && boolForm2 && boolForm3 && boolForm4 && boolForm5)
	return true;
}



function setSpanUnderline(theBool, actor){

	var lacolor;

	if (document.getElementById("switch").checked)
		lacolor = 'white';
	else
		lacolor = 'black';


	if (actor.getAttribute("id").includes("ing")){
		var ret = actor.getAttribute("id").replace('ing','');

		if (theBool){
			document.getElementById(ret).style.textDecoration='underline'; 
			document.getElementById(ret).style.color='#eb3941';}
		else {
			actor.style.textDecoration='none'; 
			document.getElementById(ret).style.textDecoration='none';
			document.getElementById(ret).style.color=lacolor;}
	}

	else {
		var ret = actor.getAttribute("id").replace('span','spaning');
		if (theBool){
			actor.style.textDecoration='underline'; 
			actor.style.color='#eb3941';}
		else {
			actor.style.textDecoration='none'; 
			document.getElementById(ret).style.textDecoration='none';
			actor.style.color=lacolor;}
	}
}



var splitRegex = /\r\n|\r|\n/g;
jsPDF.API.textEx = function (text, x, y, hAlign, vAlign) {
    var fontSize = 14;

    // As defined in jsPDF source code
    var lineHeightProportion = 1.15;

    var splittedText = null;
    var lineCount = 1;
    if (vAlign === 'middle' || vAlign === 'bottom' || hAlign === 'center' || hAlign === 'right') {
        splittedText = typeof text === 'string' ? text.split(splitRegex) : text;

        lineCount = splittedText.length || 1;
    }

    // Align the top
    y += fontSize * (2 - lineHeightProportion);

    if (vAlign === 'middle')
        y -= (lineCount / 2) * fontSize;
    else if (vAlign === 'bottom')
        y -= lineCount * fontSize;

    if (hAlign === 'center' || hAlign === 'right') {
        var alignSize = fontSize;
        if (hAlign === 'center')
            alignSize *= 0.5;

        if (lineCount > 1) {
            for (var iLine = 0; iLine < splittedText.length; iLine++) {
                this.text(splittedText[iLine], x - this.getStringUnitWidth(splittedText[iLine]) * alignSize, y);
                y += fontSize * lineHeightProportion;
            }
            return this;
        }
        x -= this.getStringUnitWidth(text) * alignSize;
    }

    this.text(text, x, y);
    return this;
};