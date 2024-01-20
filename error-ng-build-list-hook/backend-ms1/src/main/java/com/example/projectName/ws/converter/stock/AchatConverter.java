package  com.example.projectName.ws.converter.stock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.example.projectName.zynerator.util.ListUtil;

import com.example.projectName.ws.converter.stock.AchatItemConverter;
import com.example.projectName.ws.converter.commun.ClientConverter;
import com.example.projectName.ws.converter.commun.ProduitConverter;



import com.example.projectName.zynerator.util.StringUtil;
import com.example.projectName.zynerator.converter.AbstractConverter;
import com.example.projectName.zynerator.util.DateUtil;
import com.example.projectName.bean.core.stock.Achat;
import com.example.projectName.ws.dto.stock.AchatDto;

@Component
public class AchatConverter extends AbstractConverter<Achat, AchatDto> {

    @Autowired
    private AchatItemConverter achatItemConverter ;
    @Autowired
    private ClientConverter clientConverter ;
    @Autowired
    private ProduitConverter produitConverter ;
    private boolean client;
    private boolean achatItems;

    public  AchatConverter(){//AchatItem achatItemClient clientProduit produit,){
        super(Achat.class, AchatDto.class);
        init(true);
        //this.achatItem =  achatItem ;
        //this.client =  client ;
        //this.produit =  produit ;
    }

    @Override
    public Achat toItem(AchatDto dto) {
        if (dto == null) {
            return null;
        } else {
        Achat item = new Achat();
            if(StringUtil.isNotEmpty(dto.getId()))
                item.setId(dto.getId());
            if(StringUtil.isNotEmpty(dto.getReference()))
                item.setReference(dto.getReference());
            if(StringUtil.isNotEmpty(dto.getDateAchat()))
                item.setDateAchat(DateUtil.stringEnToDate(dto.getDateAchat()));
            if(StringUtil.isNotEmpty(dto.getTotal()))
                item.setTotal(dto.getTotal());
            if(StringUtil.isNotEmpty(dto.getTotalPaye()))
                item.setTotalPaye(dto.getTotalPaye());
            if(StringUtil.isNotEmpty(dto.getDescription()))
                item.setDescription(dto.getDescription());
            if(this.client && dto.getClient()!=null &&  dto.getClient().getId() != null)
                item.setClient(clientConverter.toItem(dto.getClient())) ;


            if(this.achatItems && ListUtil.isNotEmpty(dto.getAchatItems()))
                item.setAchatItems(achatItemConverter.toItem(dto.getAchatItems()));


        return item;
        }
    }

    @Override
    public AchatDto toDto(Achat item) {
        if (item == null) {
            return null;
        } else {
            AchatDto dto = new AchatDto();
            if(StringUtil.isNotEmpty(item.getId()))
                dto.setId(item.getId());
            if(StringUtil.isNotEmpty(item.getReference()))
                dto.setReference(item.getReference());
            if(item.getDateAchat()!=null)
                dto.setDateAchat(DateUtil.dateTimeToString(item.getDateAchat()));
            if(StringUtil.isNotEmpty(item.getTotal()))
                dto.setTotal(item.getTotal());
            if(StringUtil.isNotEmpty(item.getTotalPaye()))
                dto.setTotalPaye(item.getTotalPaye());
            if(StringUtil.isNotEmpty(item.getDescription()))
                dto.setDescription(item.getDescription());
        if(this.client && item.getClient()!=null) {
            dto.setClient(clientConverter.toDto(item.getClient())) ;
        }
        if(this.achatItems && ListUtil.isNotEmpty(item.getAchatItems())){
            achatItemConverter.init(true);
            achatItemConverter.setAchat(false);
            dto.setAchatItems(achatItemConverter.toDto(item.getAchatItems()));
            achatItemConverter.setAchat(true);

        }


        return dto;
        }
    }

    public void initList(boolean value) {
        this.achatItems = value;
    }

    public void initObject(boolean value) {
        this.client = value;
    }


    public AchatItemConverter getAchatItemConverter(){
        return this.achatItemConverter;
    }
    public void setAchatItemConverter(AchatItemConverter achatItemConverter ){
        this.achatItemConverter = achatItemConverter;
    }
    public ClientConverter getClientConverter(){
        return this.clientConverter;
    }
    public void setClientConverter(ClientConverter clientConverter ){
        this.clientConverter = clientConverter;
    }
    public ProduitConverter getProduitConverter(){
        return this.produitConverter;
    }
    public void setProduitConverter(ProduitConverter produitConverter ){
        this.produitConverter = produitConverter;
    }
    public boolean  isClient(){
        return this.client;
    }
    public void  setClient(boolean client){
        this.client = client;
    }
    public boolean  isAchatItems(){
        return this.achatItems ;
    }
    public void  setAchatItems(boolean achatItems ){
        this.achatItems  = achatItems ;
    }
}
