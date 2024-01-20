package  com.example.projectName.ws.converter.stock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.projectName.ws.converter.stock.AchatConverter;
import com.example.projectName.ws.converter.commun.ProduitConverter;

import com.example.projectName.bean.core.stock.Achat;


import com.example.projectName.zynerator.util.StringUtil;
import com.example.projectName.zynerator.converter.AbstractConverter;
import com.example.projectName.zynerator.util.DateUtil;
import com.example.projectName.bean.core.stock.AchatItem;
import com.example.projectName.ws.dto.stock.AchatItemDto;

@Component
public class AchatItemConverter extends AbstractConverter<AchatItem, AchatItemDto> {

    @Autowired
    private AchatConverter achatConverter ;
    @Autowired
    private ProduitConverter produitConverter ;
    private boolean produit;
    private boolean achat;

    public  AchatItemConverter(){//Achat achatProduit produit,){
        super(AchatItem.class, AchatItemDto.class);
        //this.achat =  achat ;
        //this.produit =  produit ;
    }

    @Override
    public AchatItem toItem(AchatItemDto dto) {
        if (dto == null) {
            return null;
        } else {
        AchatItem item = new AchatItem();
            if(StringUtil.isNotEmpty(dto.getId()))
                item.setId(dto.getId());
            if(StringUtil.isNotEmpty(dto.getPrixUnitaire()))
                item.setPrixUnitaire(dto.getPrixUnitaire());
            if(StringUtil.isNotEmpty(dto.getPrixVente()))
                item.setPrixVente(dto.getPrixVente());
            if(StringUtil.isNotEmpty(dto.getQuantite()))
                item.setQuantite(dto.getQuantite());
            if(StringUtil.isNotEmpty(dto.getQuantiteAvoir()))
                item.setQuantiteAvoir(dto.getQuantiteAvoir());
            if(StringUtil.isNotEmpty(dto.getRemise()))
                item.setRemise(dto.getRemise());
            if(this.produit && dto.getProduit()!=null &&  dto.getProduit().getId() != null)
                item.setProduit(produitConverter.toItem(dto.getProduit())) ;

            if(dto.getAchat() != null && dto.getAchat().getId() != null){
                item.setAchat(new Achat());
                item.getAchat().setId(dto.getAchat().getId());
                item.getAchat().setReference(dto.getAchat().getReference());
            }




        return item;
        }
    }

    @Override
    public AchatItemDto toDto(AchatItem item) {
        if (item == null) {
            return null;
        } else {
            AchatItemDto dto = new AchatItemDto();
            if(StringUtil.isNotEmpty(item.getId()))
                dto.setId(item.getId());
            if(StringUtil.isNotEmpty(item.getPrixUnitaire()))
                dto.setPrixUnitaire(item.getPrixUnitaire());
            if(StringUtil.isNotEmpty(item.getPrixVente()))
                dto.setPrixVente(item.getPrixVente());
            if(StringUtil.isNotEmpty(item.getQuantite()))
                dto.setQuantite(item.getQuantite());
            if(StringUtil.isNotEmpty(item.getQuantiteAvoir()))
                dto.setQuantiteAvoir(item.getQuantiteAvoir());
            if(StringUtil.isNotEmpty(item.getRemise()))
                dto.setRemise(item.getRemise());
        if(this.produit && item.getProduit()!=null) {
            dto.setProduit(produitConverter.toDto(item.getProduit())) ;
        }
        if(this.achat && item.getAchat()!=null) {
            dto.setAchat(achatConverter.toDto(item.getAchat())) ;
        }


        return dto;
        }
    }


    public void initObject(boolean value) {
        this.produit = value;
        this.achat = value;
    }


    public AchatConverter getAchatConverter(){
        return this.achatConverter;
    }
    public void setAchatConverter(AchatConverter achatConverter ){
        this.achatConverter = achatConverter;
    }
    public ProduitConverter getProduitConverter(){
        return this.produitConverter;
    }
    public void setProduitConverter(ProduitConverter produitConverter ){
        this.produitConverter = produitConverter;
    }
    public boolean  isProduit(){
        return this.produit;
    }
    public void  setProduit(boolean produit){
        this.produit = produit;
    }
    public boolean  isAchat(){
        return this.achat;
    }
    public void  setAchat(boolean achat){
        this.achat = achat;
    }
}
